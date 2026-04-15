"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scaleIn, fadeIn, fadeUp } from "@/lib/animations";
import { HandIcon } from "@/components/icons";

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

    useEffect(() => {
        setCameraAvailable(false);
        setGesture(null);
        fetch(videoEndpoint)
            .then(() => setCameraAvailable(true))
            .catch(() => setCameraAvailable(false));
    }, [videoEndpoint]);

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

            <AnimatePresence>
                {cameraAvailable && (
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg glass w-48 h-36"
                    >
                        <img
                            src={videoEndpoint}
                            alt="Camera feed"
                            className="w-full h-full object-cover"
                            onError={() => setCameraAvailable(false)}
                            style={{ imageRendering: "auto" }}
                        />
                        <motion.div
                            className="absolute bottom-1 right-1 glass text-[#1a4d3e] text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                            animate={{ opacity: [1, 0.6, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                            Live
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <motion.div
                    key={gesture || "default"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ fontSize: gesture ? "60px" : undefined }}
                    className="flex items-center justify-center"
                >
                    {gesture
                        ? <span>{EMOJI_MAP[gesture]}</span>
                        : mode === "face"
                            ? <span style={{ fontSize: "60px" }}>😐</span>
                            : <HandIcon className="w-14 h-14 text-[#1a4d3e]/40" />
                    }
                </motion.div>
            </AnimatePresence>

            <motion.p
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="text-sm text-[#1a4d3e]/60 text-center max-w-xs"
            >
                {gesture
                    ? `Detected: ${EMOJI_MAP[gesture]} — click to confirm`
                    : instructionText}
            </motion.p>

            <AnimatePresence>
                {gesture && onGestureSelect && (
                    <motion.button
                        type="button"
                        onClick={handleSelect}
                        className="btn-glossy rounded-2xl px-5 py-2.5 text-white text-sm font-medium"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: 10 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {confirmed ? "Selected!" : `Use ${EMOJI_MAP[gesture]} as my mood`}
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
