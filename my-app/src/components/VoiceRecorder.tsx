"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { uploadAudio } from "@/lib/actions/media"
import { scaleIn, fadeIn, overlayFade } from "@/lib/animations"
import { MicrophoneIcon } from "@/components/icons"

interface VoiceRecorderProps {
  voiceUrl: string | null
  onVoiceChange: (url: string | null) => void
}

export default function VoiceRecorder({ voiceUrl, onVoiceChange }: VoiceRecorderProps) {
  const [state, setState] = useState<"idle" | "recording" | "uploading">("idle")
  const [error, setError] = useState("")
  const [duration, setDuration] = useState(0)
  const [localAudioUrl, setLocalAudioUrl] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
    }
  }, [])

  useEffect(() => {
    return () => {
      if (localAudioUrl) URL.revokeObjectURL(localAudioUrl)
    }
  }, [localAudioUrl])

  const pickRecorderMimeType = (): string | undefined => {
    if (typeof MediaRecorder === "undefined") return undefined
    const candidates = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4;codecs=mp4a.40.2",
      "audio/mp4",
      "audio/aac",
    ]
    for (const t of candidates) {
      try {
        if (MediaRecorder.isTypeSupported?.(t)) return t
      } catch {
        // ignore
      }
    }
    return undefined
  }

  const extFor = (mime: string): string => {
    const base = mime.split(";")[0].trim().toLowerCase()
    if (base === "audio/webm") return "webm"
    if (base === "audio/mp4") return "m4a"
    if (base === "audio/aac") return "aac"
    if (base === "audio/ogg") return "ogg"
    if (base === "audio/wav") return "wav"
    if (base === "audio/mpeg") return "mp3"
    return "webm"
  }

  const startRecording = async () => {
    setError("")
    try {
      if (typeof window !== "undefined" && !window.isSecureContext) {
        setError("Microphone requires a secure (HTTPS) connection.")
        return
      }
      if (!navigator?.mediaDevices?.getUserMedia) {
        setError("This browser does not support microphone recording.")
        return
      }
      if (typeof MediaRecorder === "undefined") {
        setError("This browser does not support audio recording.")
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const mimeType = pickRecorderMimeType()
      const mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop())

        // Use the recorder's actual mimeType — iOS will produce audio/mp4,
        // Chrome/Firefox audio/webm.
        const actualType = mediaRecorder.mimeType || mimeType || "audio/webm"
        const blob = new Blob(chunksRef.current, { type: actualType })
        const localUrl = URL.createObjectURL(blob)
        setLocalAudioUrl(localUrl)

        setState("uploading")
        try {
          const formData = new FormData()
          const ext = extFor(actualType)
          formData.append("audio", blob, `recording.${ext}`)
          const result = await uploadAudio(formData)
          onVoiceChange(result.url)
        } catch (err) {
          setError(err instanceof Error ? err.message : "Upload failed")
        } finally {
          setState("idle")
        }
      }

      // Request data every second so we always have chunks even if the user
      // backgrounds the tab on mobile before hitting stop.
      mediaRecorder.start(1000)
      setState("recording")
      setDuration(0)
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000)
    } catch (err) {
      const name = err instanceof Error ? err.name : ""
      if (name === "NotAllowedError" || name === "SecurityError") {
        setError("Microphone permission denied. Enable it in your browser settings.")
      } else if (name === "NotFoundError") {
        setError("No microphone found on this device.")
      } else {
        setError(err instanceof Error && err.message ? err.message : "Microphone not available.")
      }
    }
  }

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    mediaRecorderRef.current?.stop()
  }

  const removeRecording = () => {
    onVoiceChange(null)
    if (localAudioUrl) {
      URL.revokeObjectURL(localAudioUrl)
      setLocalAudioUrl(null)
    }
  }

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[#1a4d3e]">Voice Note</label>

      <AnimatePresence>
        {error && (
          <motion.div
            key="error"
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass rounded-2xl border-2 border-red-200/50 p-4"
          >
            <p className="text-red-700 text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {voiceUrl && state === "idle" && (
          <motion.div
            key="playback"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            className="glass rounded-2xl p-4 flex items-center gap-4"
          >
            <MicrophoneIcon className="w-5 h-5 text-[#1a4d3e] shrink-0" />
            <audio controls src={voiceUrl} className="flex-1 min-w-0" />
            <motion.button
              type="button"
              onClick={removeRecording}
              className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors shrink-0"
              whileTap={{ scale: 0.97 }}
            >
              Remove
            </motion.button>
          </motion.div>
        )}

        {state === "idle" && !voiceUrl && (
          <motion.button
            key="idle"
            type="button"
            onClick={startRecording}
            className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#4A90E2]/50 rounded-2xl text-sm font-medium text-[#1a4d3e] hover:border-[#4A90E2] hover:bg-[#4A90E2]/5 transition-all"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <MicrophoneIcon className="w-4 h-4" /> Start Recording
          </motion.button>
        )}

        {state === "recording" && (
          <motion.div
            key="recording"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            className="glass rounded-2xl p-4 flex items-center gap-4"
          >
            <motion.span
              className="inline-block w-3 h-3 rounded-full bg-red-500 shrink-0"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            />
            <span className="text-sm font-mono text-[#1a4d3e] tabular-nums">{formatDuration(duration)}</span>
            <motion.button
              type="button"
              onClick={stopRecording}
              className="ml-auto glass rounded-2xl px-4 py-2 text-sm font-medium text-[#1a4d3e] hover:bg-white/40 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Stop
            </motion.button>
          </motion.div>
        )}

        {state === "uploading" && (
          <motion.div
            key="uploading"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="glass rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#4A90E2] border-t-transparent shrink-0" />
            <span className="text-sm text-[#1a4d3e]/60">Uploading voice note…</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
