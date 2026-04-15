import os
import asyncio
import threading
import numpy as np
import cv2
import mediapipe as mp
from mediapipe.tasks import python as mp_python
from mediapipe.tasks.python import vision

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

FACE_MODEL_PATH = os.path.join(os.path.dirname(__file__), "face_landmarker.task")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3444").split(",")
ALLOW_ALL = ALLOWED_ORIGINS == ["*"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if ALLOW_ALL else ALLOWED_ORIGINS,
    allow_origin_regex=".*" if ALLOW_ALL else None,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Landmarker loaded once at startup — reused across all requests
# ---------------------------------------------------------------------------

_face_landmarker = None
_lock = threading.Lock()   # MediaPipe isn't thread-safe; serialize detect calls


def _load_models():
    global _face_landmarker

    cpu = mp_python.BaseOptions.Delegate.CPU

    if os.path.exists(FACE_MODEL_PATH):
        face_options = vision.FaceLandmarkerOptions(
            base_options=mp_python.BaseOptions(model_asset_path=FACE_MODEL_PATH, delegate=cpu),
            num_faces=1,
            min_face_detection_confidence=0.5,
            min_face_presence_confidence=0.5,
            min_tracking_confidence=0.5,
            output_face_blendshapes=True,
        )
        _face_landmarker = vision.FaceLandmarker.create_from_options(face_options)
    else:
        print("face_landmarker.task not found — face detection disabled")


# ---------------------------------------------------------------------------
# Detection helpers
# ---------------------------------------------------------------------------

def get_face_emotion(face_results):
    if not face_results.face_blendshapes:
        return None
    shapes = {b.category_name: b.score for b in face_results.face_blendshapes[0]}

    smile    = (shapes.get("mouthSmileLeft", 0) + shapes.get("mouthSmileRight", 0)) / 2
    cheek    = (shapes.get("cheekSquintLeft", 0) + shapes.get("cheekSquintRight", 0)) / 2
    positive = smile + cheek * 0.4

    frown      = (shapes.get("mouthFrownLeft", 0) + shapes.get("mouthFrownRight", 0)) / 2
    brow_inner = shapes.get("browInnerUp", 0)
    negative   = min(frown * 2.5 + brow_inner, 1.0)

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


def _process_frame(raw: bytes) -> dict:
    nparr = np.frombuffer(raw, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if frame is None:
        return {"gesture": None}

    rgb      = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)

    with _lock:
        if _face_landmarker is None:
            return {"gesture": None}
        face_results = _face_landmarker.detect(mp_image)
        return {"gesture": get_face_emotion(face_results)}


# ---------------------------------------------------------------------------
# HTTP endpoint
# ---------------------------------------------------------------------------

@app.post("/detect")
async def detect(request: Request):
    data = await request.body()
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, _process_frame, data)
    return JSONResponse(result)


# ---------------------------------------------------------------------------
# Startup
# ---------------------------------------------------------------------------

@app.on_event("startup")
def startup_event():
    _load_models()
    print(f"Face landmarker ready: {_face_landmarker is not None}")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
