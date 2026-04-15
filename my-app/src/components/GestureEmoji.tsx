"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scaleIn, fadeIn, fadeUp } from "@/lib/animations";

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
}

export default function GestureEmoji({ onGestureSelect }: GestureEmojiProps) {
    const [gesture, setGesture]                 = useState<Gesture>(null);
    const [confirmed, setConfirmed]             = useState(false);
    const [cameraActive, setCameraActive]       = useState(false);
    const [cameraError, setCameraError]         = useState<string | null>(null);
    const [serverError, setServerError]         = useState<string | null>(null);

    const videoRef    = useRef<HTMLVideoElement>(null);
    const canvasRef   = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const streamRef   = useRef<MediaStream | null>(null);
    const sendingRef  = useRef(false);

    const stopAll = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
        intervalRef.current = null;
        streamRef.current   = null;
    }, []);

    useEffect(() => {
        setGesture(null);
        setConfirmed(false);
        setCameraActive(false);
        setCameraError(null);
        setServerError(null);
        stopAll();

        let cancelled = false;

        async function start() {
            if (!navigator.mediaDevices?.getUserMedia) {
                setCameraError("Camera API not available — ensure the page is served over HTTPS.");
                return;
            }
            let stream: MediaStream;
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
            } catch (err) {
                const msg = err instanceof Error ? err.message : String(err);
                setCameraError(msg);
                return;
            }
            if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }

            streamRef.current = stream;
            setCameraActive(true); // mount the video element first, then attach in effect below
        }

        start();
        return () => {
            cancelled = true;
            stopAll();
        };
    }, [stopAll]);

    // Attach stream once video element is in the DOM (after setCameraActive(true))
    useEffect(() => {
        if (!cameraActive || !videoRef.current || !streamRef.current) return;
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.play().catch(() => {});

        const canvas = canvasRef.current!;
        const ctx2d  = canvas.getContext("2d")!;
        let cancelled = false;

        intervalRef.current = setInterval(() => {
            if (sendingRef.current) return;
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
                    const res = await fetch(`/api/gesture?mode=face`, {
                        method: "POST",
                        headers: { "Content-Type": "application/octet-stream" },
                        body: buf,
                    });
                    if (!res.ok) {
                        const errText = await res.text().catch(() => `HTTP ${res.status}`);
                        setServerError(errText);
                        return;
                    }
                    setServerError(null);
                    const data = await res.json() as { gesture: Gesture };
                    setGesture(data.gesture);
                    setConfirmed(false);
                } catch (err) {
                    setServerError(err instanceof Error ? err.message : "Server unreachable");
                } finally { sendingRef.current = false; }
            }, "image/jpeg", 0.7);
        }, 800);

        return () => { cancelled = true; };
    }, [cameraActive]);

    const handleSelect = () => {
        if (gesture && onGestureSelect) {
            onGestureSelect(EMOJI_MAP[gesture]);
            setConfirmed(true);
        }
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <canvas ref={canvasRef} className="hidden" />

            {cameraError && (
                <p className="text-xs text-red-500/80 text-center max-w-xs">
                    Camera unavailable: {cameraError}
                </p>
            )}

            {serverError && (
                <p className="text-xs text-orange-500/80 text-center max-w-xs">
                    Detection error: {serverError}
                </p>
            )}

            {/* Video always rendered so ref is available; hidden until camera active */}
            <div className={cameraActive ? "relative rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg glass w-48 h-36" : "hidden"}>
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    autoPlay
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
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={gesture || "default"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ fontSize: "60px" }}
                    className="flex items-center justify-center"
                >
                    <span>{gesture ? EMOJI_MAP[gesture] : "😐"}</span>
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
                    : "Show your facial expression — smile big, small, neutral, slight frown, or frown"}
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
