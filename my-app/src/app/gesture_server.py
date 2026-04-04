import mediapipe as mp
from mediapipe.tasks import python as mp_python
from mediapipe.tasks.python import vision
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

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

current_gesture = {"gesture": None}
latest_frame = {"frame": None}
frame_lock = threading.Lock()

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
    if angle > 45:
        return "happy"
    elif angle < -45:
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

    cam = cv2.VideoCapture(0)

    with vision.HandLandmarker.create_from_options(hand_options) as hand_landmarker:
        while cam.isOpened():
            success, frame = cam.read()
            if not success:
                continue

            frame = cv2.flip(frame, 1)
            rgb      = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
            results  = hand_landmarker.detect(mp_image)

            gesture = None
            if results.hand_landmarks:
                draw_hand_landmarks(frame, results)
                for hand_lm in results.hand_landmarks:
                    gesture = get_thumb_gesture(hand_lm)
                    if gesture:
                        break

            current_gesture["gesture"] = gesture

            small_frame = cv2.resize(frame, (320, 240))
            _, buffer = cv2.imencode(".jpg", small_frame, [cv2.IMWRITE_JPEG_QUALITY, 50])
            with frame_lock:
                latest_frame["frame"] = buffer.tobytes()

    cam.release()

def generate_frames():
    while True:
        with frame_lock:
            frame = latest_frame["frame"]
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
        generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

@app.on_event("startup")
def startup_event():
    thread = threading.Thread(target=camera_loop, daemon=True)
    thread.start()

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)