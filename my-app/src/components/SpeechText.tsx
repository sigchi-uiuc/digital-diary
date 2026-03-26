// npm install --save react-speech-recognition
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
"use client"

import { useState, useRef, useEffect } from "react";

export default function Recorder() {
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const chunks = useRef<Blob[]>([]);
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

    useEffect(() => {
        return () => {
            if (audioURL) URL.revokeObjectURL(audioURL);
        };
    }, [audioURL]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            chunks.current = [];

            mediaRecorder.current.ondataavailable = (e: BlobEvent) => {
                if (e.data && e.data.size > 0) chunks.current.push(e.data);
            };

            mediaRecorder.current.onstop = () => {
                const blob = new Blob(chunks.current, { type: "audio/webm" });
                chunks.current = [];

                if (audioURL) {
                    URL.revokeObjectURL(audioURL);
                }

                const url = URL.createObjectURL(blob);
                setAudioBlob(blob);
                setAudioURL(url);
            };

            mediaRecorder.current.start();
            setRecording(true);
        } catch (err) {
            console.error("Failed to access microphone:", err);
            alert("Microphone access is required to record audio.");
        }
    };

    const stopRecording = () => {
        if (!mediaRecorder.current) return;
        mediaRecorder.current.stop();
        setRecording(false);
    };

    const handleDownload = () => {
        if (!audioBlob) return;
        const filename = `recording-${Date.now()}.webm`;
        const link = document.createElement("a");
        const url = URL.createObjectURL(audioBlob);
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={startRecording}
                    disabled={recording}
                    className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
                >
                    Start Recording
                </button>

                <button
                    onClick={stopRecording}
                    disabled={!recording}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Stop Recording
                </button>
            </div>

            <p className="mt-3 text-sm text-gray-700">Playback:</p>
            <div className="rounded border p-2 min-h-[80px] bg-white mt-1">
                {audioURL ? (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                        <audio controls src={audioURL} />
                        <div className="mt-2 sm:mt-0">
                            <button
                                onClick={handleDownload}
                                className="px-3 py-1 bg-green-600 text-white rounded"
                            >
                                Download Recording
                            </button>
                        </div>
                    </div>
                ) : (
                    "No recording yet."
                )}
            </div>
        </div>
    );
}

