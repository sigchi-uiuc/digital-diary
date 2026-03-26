"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import MediaUpload from "@/components/MediaUpload"
import SpeechText from "@/components/SpeechText"
import { createEntry } from "@/lib/actions/entries"

const emojiOptions = [
  { emoji: "😢", label: "Terrible" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😊", label: "Good" },
  { emoji: "😄", label: "Fantastic" },
]

export default function CreateFreewriteEntry() {
  const [content, setContent] = useState("")
  const [visibility, setVisibility] = useState("PRIVATE")
  const [qualityEmoji, setQualityEmoji] = useState("")
  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentDateTime, setCurrentDateTime] = useState("")
  const router = useRouter()

  useEffect(() => {
    const update = () => {
      setCurrentDateTime(
        new Date().toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await createEntry({
        type: "FREEWRITE",
        content,
        visibility,
        qualityEmoji: qualityEmoji || null,
        mediaUrls,
      })
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative z-10">
      <nav className="glass-strong sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              href="/"
              className="glass rounded-2xl px-4 py-2 text-sm font-medium text-[#1a4d3e] hover:bg-white/40 transition-all"
            >
              ← Digital Diary
            </Link>
            <span className="text-xs text-[#1a4d3e]/60 hidden sm:block">{currentDateTime}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="panel-soft overflow-hidden">
            <div className="px-6 py-5 border-b border-white/20">
              <h1 className="text-2xl font-bold text-[#1a4d3e]">Freewrite Entry</h1>
              <p className="mt-1 text-sm text-[#1a4d3e]/60">
                Express your thoughts freely without structure or prompts
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="glass-strong rounded-2xl border border-red-200/50 p-4">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-[#1a4d3e] mb-2">
                  What&apos;s on your mind?
                </label>
                <textarea
                  id="content"
                  rows={12}
                  className="input-glass w-full px-4 py-3 focus:ring-2 focus:ring-[#4A90E2] resize-none"
                  placeholder="Start writing about anything that comes to mind... your thoughts, feelings, experiences, dreams, or just stream of consciousness..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
                <p className="mt-1 text-xs text-[#1a4d3e]/50">{content.length} characters</p>
              </div>

              {/* Mood */}
              <div>
                <label className="block text-sm font-medium text-[#1a4d3e] mb-4 text-center">
                  How was your day today?
                </label>
                <div className="flex justify-center gap-3 flex-wrap">
                  {emojiOptions.map((option) => (
                    <button
                      key={option.emoji}
                      type="button"
                      className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all hover:scale-105 ${
                        qualityEmoji === option.emoji
                          ? "border-[#4A90E2] bg-[#4A90E2]/10"
                          : "border-white/50 glass hover:border-white/70"
                      }`}
                      onClick={() => setQualityEmoji(qualityEmoji === option.emoji ? "" : option.emoji)}
                    >
                      <span className="text-3xl mb-1">{option.emoji}</span>
                      <span className="text-xs text-[#1a4d3e]/70">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Media Upload */}
              {/* Record Audio */}
              <div>
                <label className="block text-sm font-medium text-[#1a4d3e] mb-2">Record Audio</label>
                <div className="panel-soft p-3 rounded-md">
                  <SpeechText />
                  <p className="mt-2 text-xs text-[#1a4d3e]/60">Record and playback audio for this entry. Download the file if you want to attach it.</p>
                </div>
              </div>

              {/* Media Upload */}
              <div>
                <MediaUpload mediaUrls={mediaUrls} onMediaChange={setMediaUrls} />
              </div>

              {/* Visibility */}
              <div>
                <label htmlFor="visibility" className="block text-sm font-medium text-[#1a4d3e] mb-2">
                  Entry Visibility
                </label>
                <select
                  id="visibility"
                  className="input-glass w-full px-4 py-3 focus:ring-2 focus:ring-[#4A90E2]"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                >
                  <option value="PRIVATE">Private — Only you can see this</option>
                  <option value="PROTECTED">Protected — Visible to friends</option>
                  <option value="PUBLIC">Public — Visible to everyone</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-white/20">
                <Link
                  href="/"
                  className="glass rounded-2xl px-4 py-2 text-sm font-medium text-[#1a4d3e] hover:bg-white/40 transition-all"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading || !content.trim()}
                  className="btn-glossy rounded-2xl px-6 py-2.5 text-white font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating..." : "Create Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
