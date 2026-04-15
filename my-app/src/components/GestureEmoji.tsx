"use client";
import { useEffect, useRef, useState, useCallback } from "react";
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
    const [gesture, setGesture]                 = useState<Gesture>(null);
    const [confirmed, setConfirmed]             = useState(false);
    const [cameraAvailable, setCameraAvailable] = useState(false);

    const videoRef    = useRef<HTMLVideoElement>(null);
    const canvasRef   = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const streamRef   = useRef<MediaStream | null>(null);
    const sendingRef  = useRef(false); // prevent overlapping requests

    const stopAll = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
        intervalRef.current = null;
        streamRef.current   = null;
    }, []);

    useEffect(() => {
        setGesture(null);
        setConfirmed(false);
        setCameraAvailable(false);
        stopAll();

        let cancelled = false;

        async function start() {
            let stream: MediaStream;
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
            } catch {
                return; // camera denied or unavailable
            }
            if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }

            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play().catch(() => {});
            }
            setCameraAvailable(true);

            const canvas = canvasRef.current!;
            const ctx2d  = canvas.getContext("2d")!;

            intervalRef.current = setInterval(() => {
                if (sendingRef.current) return; // skip frame if previous still in-flight
                const video = videoRef.current;
                if (!video || video.readyState < 2) return;

                canvas.width  = 320;
                canvas.height = 240;
                ctx2d.drawImage(video, 0, 0, 320, 240);

                canvas.toBlob(async (blob) => {
                    if (!blob || cancelled) return;
                    sendingRef.current = true;
                    try {
                        const buf = await blob.arrayBuffer();
                        const res = await fetch(`/api/gesture?mode=${mode}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/octet-stream" },
                            body: buf,
                        });
                        if (res.ok) {
                            const data = await res.json() as { gesture: Gesture };
                            setGesture(data.gesture);
                            setConfirmed(false);
                        }
                    } catch { /* server unavailable */ }
                    finally { sendingRef.current = false; }
                }, "image/jpeg", 0.7);
            }, 150); // ~7 fps — enough for gesture detection, leaves room for round-trip
        }

        start();
        return () => {
            cancelled = true;
            stopAll();
        };
    }, [mode, stopAll]);

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
            {/* Hidden canvas used to capture frames */}
            <canvas ref={canvasRef} className="hidden" />

            <AnimatePresence>
                {cameraAvailable && (
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg glass w-48 h-36"
                    >
                        <video
                            ref={videoRef}
                            muted
                            playsInline
                            className="w-full h-full object-cover scale-x-[-1]"
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
