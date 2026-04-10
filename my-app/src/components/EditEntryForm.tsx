"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import { moodBasedPrompts, emojiOptions } from "@/lib/guidedPrompts"
import { updateEntry } from "@/lib/actions/entries"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

interface Entry {
  id: string
  type: "FREEWRITE" | "GUIDED"
  content: string | null
  visibility: "PRIVATE" | "PUBLIC" | "PROTECTED"
  qualityEmoji: string | null
  createdAt: Date
  updatedAt: Date
}

interface Props {
  entry: Entry
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function EditEntryForm({ entry }: Props) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [currentDateTime, setCurrentDateTime] = useState("")

  const [content, setContent] = useState(entry.content || "")
  const [visibility, setVisibility] = useState(entry.visibility || "PRIVATE")
  const [qualityEmoji, setQualityEmoji] = useState(entry.qualityEmoji || "")
  const [responses, setResponses] = useState<Record<number, string>>({})

  useEffect(() => {
    if (entry.type === "GUIDED" && entry.content) {
      const sections = entry.content.split(/\*\*(.*?)\*\*/)
      const parsed: Record<number, string> = {}
      for (let i = 1; i < sections.length; i += 2) {
        parsed[Math.floor(i / 2)] = sections[i + 1]?.trim() || ""
      }
      setResponses(parsed)
    }
  }, [entry])

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
    setIsSaving(true)
    setError("")

    try {
      let contentToSave = content

      if (entry.type === "GUIDED" && entry.qualityEmoji) {
        const promptData = moodBasedPrompts[entry.qualityEmoji as keyof typeof moodBasedPrompts]
        if (promptData) {
          contentToSave = promptData.prompts
            .map((promptText, index) => `**${promptText}**\n${responses[index] || ""}`)
            .join("\n\n")
        }
      }

      await updateEntry(entry.id, {
        content: contentToSave,
        visibility,
        qualityEmoji: qualityEmoji || null,
      })

      router.push(`/entries/${entry.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSaving(false)
    }
  }

  const promptData =
    entry.type === "GUIDED" && entry.qualityEmoji
      ? moodBasedPrompts[entry.qualityEmoji as keyof typeof moodBasedPrompts]
      : null

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
              <h1 className="text-2xl font-bold text-[#1a4d3e]">
                Edit {entry.type === "FREEWRITE" ? "Freewrite" : "Guided"} Entry
              </h1>
              <p className="mt-1 text-sm text-[#1a4d3e]/60">
                Originally created on {formatDate(entry.createdAt)}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="glass-strong rounded-2xl border border-red-200/50 p-4">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Freewrite Content */}
              {entry.type === "FREEWRITE" && (
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-[#1a4d3e] mb-2">
                    What&apos;s on your mind?
                  </label>
                  <div data-color-mode="light">
                    <MDEditor
                      value={content}
                      onChange={(val) => setContent(val || "")}
                      height={400}
                      className="w-full border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-[#4A90E2]"
                    />
                  </div>
                  <p className="mt-1 text-xs text-[#1a4d3e]/50">{content.length} characters</p>
                </div>
              )}

              {/* Guided Content */}
              {entry.type === "GUIDED" && promptData && (
                <div className="space-y-6">
                  <div className="panel-soft p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{entry.qualityEmoji}</span>
                      <div>
                        <h3 className="font-semibold text-[#1a4d3e]">{promptData.title}</h3>
                        <p className="text-sm text-[#1a4d3e]/70 mt-1">{promptData.description}</p>
                      </div>
                    </div>
                  </div>

                  {promptData.prompts.map((promptText, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-[#1a4d3e] mb-2">
                        {promptText}
                      </label>
                      <textarea
                        rows={4}
                        className="input-glass w-full px-4 py-3 focus:ring-2 focus:ring-[#4A90E2] resize-none"
                        placeholder="Share your thoughts..."
                        value={responses[index] || ""}
                        onChange={(e) =>
                          setResponses((prev) => ({ ...prev, [index]: e.target.value }))
                        }
                      />
                    </div>
                  ))}
                </div>
              )}

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

              {/* Visibility */}
              <div>
                <label htmlFor="visibility" className="block text-sm font-medium text-[#1a4d3e] mb-2">
                  Entry Visibility
                </label>
                <select
                  id="visibility"
                  className="input-glass w-full px-4 py-3 focus:ring-2 focus:ring-[#4A90E2]"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as "PRIVATE" | "PUBLIC" | "PROTECTED")}
                >
                  <option value="PRIVATE">Private — Only you can see this</option>
                  <option value="PROTECTED">Shared with friends</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-white/20">
                <Link
                  href={`/entries/${entry.id}`}
                  className="glass rounded-2xl px-4 py-2 text-sm font-medium text-[#1a4d3e] hover:bg-white/40 transition-all"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-glossy rounded-2xl px-6 py-2.5 text-white font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
