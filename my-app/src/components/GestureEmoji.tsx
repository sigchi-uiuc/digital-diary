"use client";
import { useEffect, useState } from "react";

type Gesture = "fantastic" | "good" | "okay" | "sad" | "terrible" | null;

const EMOJI_MAP: Record<NonNullable<Gesture>, string> = {
    fantastic: "😄",
    good: "😊",
    okay: "😐",
    sad: "😔",
    terrible: "😢",
};

interface GestureEmojiProps {
    onGestureSelect?: (emoji: string) => void;
    mode?: "hand" | "face";
}

export default function GestureEmoji({ onGestureSelect, mode = "hand" }: GestureEmojiProps) {
    const [gesture, setGesture] = useState<Gesture>(null);
    const [confirmed, setConfirmed] = useState(false);
    const [cameraAvailable, setCameraAvailable] = useState(false);

    const gestureEndpoint = mode === "face"
        ? "http://127.0.0.1:8000/face_gesture"
        : "http://127.0.0.1:8000/gesture";
    const videoEndpoint = mode === "face"
        ? "http://127.0.0.1:8000/face_video"
        : "http://127.0.0.1:8000/video";

    // Check if camera stream is available whenever mode changes
    useEffect(() => {
        setCameraAvailable(false);
        setGesture(null);
        fetch(videoEndpoint)
            .then(() => setCameraAvailable(true))
            .catch(() => setCameraAvailable(false));
    }, [videoEndpoint]);

    // Poll for gesture
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch(gestureEndpoint);
                const data = await res.json();
                setGesture(data.gesture);
                setConfirmed(false);
            } catch {
                // Server not running
            }
        }, 200);

        return () => clearInterval(interval);
    }, [gestureEndpoint]);

    const handleSelect = () => {
        if (gesture && onGestureSelect) {
            onGestureSelect(EMOJI_MAP[gesture]);
            setConfirmed(true);
        }
    };

    const instructionText = mode === "face"
        ? "Show your facial expression — smile big, small, neutral, slight frown, or frown"
        : "Point your thumb: all the way up, slightly up, sideways, slightly down, or all the way down";

    return (
        <div className="flex flex-col items-center gap-3">

            {/* Mini camera feed */}
            {cameraAvailable && (
                <div className="relative rounded-xl overflow-hidden border-2 border-indigo-200 shadow-md w-48 h-36">
                    <img
                        src={videoEndpoint}
                        alt="Camera feed"
                        className="w-full h-full object-cover"
                        onError={() => setCameraAvailable(false)}
                        style={{ imageRendering: "auto" }}
                    />
                    <div className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded-full">
                        🔴 Live
                    </div>
                </div>
            )}

            {/* Detected emoji */}
            <div style={{ fontSize: "60px" }}>
                {gesture ? EMOJI_MAP[gesture] : (mode === "face" ? "😐" : "🤚")}
            </div>

            <p className="text-sm text-gray-500 text-center max-w-xs">
                {gesture
                    ? `Detected: ${EMOJI_MAP[gesture]} — click to confirm`
                    : instructionText}
            </p>

            {gesture && onGestureSelect && (
                <button
                    type="button"
                    onClick={handleSelect}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                >
                    {confirmed ? "✓ Selected!" : `Use ${EMOJI_MAP[gesture]} as my mood`}
                </button>
            )}
        </div>
    );
}
