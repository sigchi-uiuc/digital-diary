import mediapipe as mp
from mediapipe.tasks import python as mp_python
from mediapipe.tasks.python import vision
from contextlib import nullcontext
import numpy as np
import cv2
import threading
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import uvicorn
import time
import os

HAND_MODEL_PATH = os.path.join(os.path.dirname(__file__), "hand_landmarker.task")
FACE_MODEL_PATH = os.path.join(os.path.dirname(__file__), "face_landmarker.task")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

current_gesture = {"gesture": None}
current_face_gesture = {"gesture": None}
latest_hand_frame = {"frame": None}
latest_face_frame = {"frame": None}
hand_frame_lock = threading.Lock()
face_frame_lock = threading.Lock()

HAND_CONNECTIONS = [
    (0,1),(1,2),(2,3),(3,4),
    (0,5),(5,6),(6,7),(7,8),
    (5,9),(9,10),(10,11),(11,12),
    (9,13),(13,14),(14,15),(15,16),
    (13,17),(17,18),(18,19),(19,20),(0,17)
]

def draw_hand_landmarks(frame, detection_result):
    h, w = frame.shape[:2]
    for hand_landmarks in detection_result.hand_landmarks:
        for start, end in HAND_CONNECTIONS:
            x0 = int(hand_landmarks[start].x * w)
            y0 = int(hand_landmarks[start].y * h)
            x1 = int(hand_landmarks[end].x * w)
            y1 = int(hand_landmarks[end].y * h)
            cv2.line(frame, (x0, y0), (x1, y1), (0, 255, 0), 2)
        for lm in hand_landmarks:
            cx, cy = int(lm.x * w), int(lm.y * h)
            cv2.circle(frame, (cx, cy), 4, (255, 0, 0), -1)

def is_thumb_only(hand_landmarks):
    fingers = [(8,6),(12,10),(16,14),(20,18)]
    for tip, pip in fingers:
        if hand_landmarks[tip].y < hand_landmarks[pip].y:
            return False
    return True

def get_thumb_gesture(hand_landmarks):
    if not is_thumb_only(hand_landmarks):
        return None
    thumb_tip  = hand_landmarks[4]
    thumb_base = hand_landmarks[2]
    dx = thumb_tip.x - thumb_base.x
    dy = thumb_tip.y - thumb_base.y
    angle = np.degrees(np.arctan2(-dy, dx))
    # Split into 5 emotion bands based on thumb angle
    # ~90° = straight up (fantastic), ~0° = horizontal (okay), ~-90° = straight down (terrible)
    if angle > 60:
        return "fantastic"
    elif angle > 20:
        return "good"
    elif angle > -20:
        return "okay"
    elif angle > -60:
        return "sad"
    else:
        return "terrible"

def get_face_emotion(face_results):
    if not face_results.face_blendshapes:
        return None
    shapes = {b.category_name: b.score for b in face_results.face_blendshapes[0]}

    # Positive signals — smile scores naturally reach 0.5–0.9
    smile = (shapes.get("mouthSmileLeft", 0) + shapes.get("mouthSmileRight", 0)) / 2
    cheek = (shapes.get("cheekSquintLeft", 0) + shapes.get("cheekSquintRight", 0)) / 2
    positive = smile + cheek * 0.4

    # Negative signals — frown scores are weak (0.05–0.2 even for strong frowns),
    # so amplify them; browInnerUp (inner brows raised) is a strong, detectable sad signal
    frown = (shapes.get("mouthFrownLeft", 0) + shapes.get("mouthFrownRight", 0)) / 2
    brow_inner = shapes.get("browInnerUp", 0)
    negative = min(frown * 2.5 + brow_inner, 1.0)

    if positive > 0.45:
        return "fantastic"
    elif positive > 0.18:
        return "good"
    elif negative > 0.5:
        return "terrible"
    elif negative > 0.25:
        return "sad"
    else:
        return "okay"

def camera_loop():
    hand_options = vision.HandLandmarkerOptions(
        base_options=mp_python.BaseOptions(model_asset_path=HAND_MODEL_PATH),
        num_hands=2,
        min_hand_detection_confidence=0.5,
        min_tracking_confidence=0.5,
    )

    if os.path.exists(FACE_MODEL_PATH):
        face_options = vision.FaceLandmarkerOptions(
            base_options=mp_python.BaseOptions(model_asset_path=FACE_MODEL_PATH),
            num_faces=1,
            min_face_detection_confidence=0.5,
            min_face_presence_confidence=0.5,
            min_tracking_confidence=0.5,
            output_face_blendshapes=True,
        )
        face_ctx = vision.FaceLandmarker.create_from_options(face_options)
    else:
        print("face_landmarker.task not found — face tracking disabled. "
              "Download it from https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task")
        face_ctx = nullcontext(None)

    cam = cv2.VideoCapture(0)

    with vision.HandLandmarker.create_from_options(hand_options) as hand_landmarker, \
         face_ctx as face_landmarker:
        while cam.isOpened():
            success, frame = cam.read()
            if not success:
                continue

            frame = cv2.flip(frame, 1)
            rgb      = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)

            # --- Hand detection ---
            hand_results = hand_landmarker.detect(mp_image)
            gesture = None
            hand_frame = frame.copy()
            if hand_results.hand_landmarks:
                draw_hand_landmarks(hand_frame, hand_results)
                for hand_lm in hand_results.hand_landmarks:
                    gesture = get_thumb_gesture(hand_lm)
                    if gesture:
                        break
            current_gesture["gesture"] = gesture

            small_hand = cv2.resize(hand_frame, (320, 240))
            _, buf = cv2.imencode(".jpg", small_hand, [cv2.IMWRITE_JPEG_QUALITY, 50])
            with hand_frame_lock:
                latest_hand_frame["frame"] = buf.tobytes()

            # --- Face detection (no landmarks drawn on video) ---
            face_gesture = None
            if face_landmarker is not None:
                face_results = face_landmarker.detect(mp_image)
                face_gesture = get_face_emotion(face_results)
            current_face_gesture["gesture"] = face_gesture

            small_face = cv2.resize(frame, (320, 240))
            _, buf = cv2.imencode(".jpg", small_face, [cv2.IMWRITE_JPEG_QUALITY, 50])
            with face_frame_lock:
                latest_face_frame["frame"] = buf.tobytes()

    cam.release()

def generate_hand_frames():
    while True:
        with hand_frame_lock:
            frame = latest_hand_frame["frame"]
        if frame:
            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n"
            )
        time.sleep(0.033)

def generate_face_frames():
    while True:
        with face_frame_lock:
            frame = latest_face_frame["frame"]
        if frame:
            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n"
            )
        time.sleep(0.033)

@app.get("/gesture")
def get_gesture():
    return current_gesture

@app.get("/video")
def video_feed():
    return StreamingResponse(
        generate_hand_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

@app.get("/face_gesture")
def get_face_gesture():
    return current_face_gesture

@app.get("/face_video")
def face_video_feed():
    return StreamingResponse(
        generate_face_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

@app.on_event("startup")
def startup_event():
    thread = threading.Thread(target=camera_loop, daemon=True)
    thread.start()

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
