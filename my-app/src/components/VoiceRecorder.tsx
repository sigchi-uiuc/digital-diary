"use client"

import { useState, useRef, useEffect } from "react"
import { uploadAudio } from "@/lib/actions/media"

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

  const startRecording = async () => {
    setError("")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop())

        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        const localUrl = URL.createObjectURL(blob)
        setLocalAudioUrl(localUrl)

        setState("uploading")
        try {
          const formData = new FormData()
          formData.append("audio", blob, "recording.webm")
          const result = await uploadAudio(formData)
          onVoiceChange(result.url)
        } catch (err) {
          setError(err instanceof Error ? err.message : "Upload failed")
        } finally {
          setState("idle")
        }
      }

      mediaRecorder.start()
      setState("recording")
      setDuration(0)
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000)
    } catch {
      setError("Microphone access denied or not available.")
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

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {voiceUrl && state === "idle" && (
        <div className="glass rounded-2xl p-4 flex items-center gap-4">
          <span className="text-2xl shrink-0">&#127897;</span>
          <audio controls src={voiceUrl} className="flex-1 min-w-0" />
          <button
            type="button"
            onClick={removeRecording}
            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors shrink-0"
          >
            Remove
          </button>
        </div>
      )}

      {state === "idle" && !voiceUrl && (
        <button
          type="button"
          onClick={startRecording}
          className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#4A90E2]/50 rounded-2xl text-sm font-medium text-[#1a4d3e] hover:border-[#4A90E2] hover:bg-[#4A90E2]/5 transition-all"
        >
          <span>&#127897;</span> Start Recording
        </button>
      )}

      {state === "recording" && (
        <div className="glass rounded-2xl p-4 flex items-center gap-4">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 animate-pulse shrink-0" />
          <span className="text-sm font-mono text-[#1a4d3e] tabular-nums">{formatDuration(duration)}</span>
          <button
            type="button"
            onClick={stopRecording}
            className="ml-auto glass rounded-2xl px-4 py-2 text-sm font-medium text-[#1a4d3e] hover:bg-white/40 transition-all"
          >
            Stop
          </button>
        </div>
      )}

      {state === "uploading" && (
        <div className="glass rounded-2xl p-4">
          <span className="text-sm text-[#1a4d3e]/60">Uploading voice note...</span>
        </div>
      )}
    </div>
  )
}
