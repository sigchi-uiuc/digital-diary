"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { moodBasedPrompts, emojiOptions } from "@/lib/guidedPrompts"

interface Entry {
  id: string
  type: "FREEWRITE" | "GUIDED"
  content: string | null
  visibility: "PRIVATE" | "PUBLIC" | "PROTECTED"
  qualityEmoji: string | null
  createdAt: string
  updatedAt: string
}

export default function EditEntry() {
  const params = useParams()
  const router = useRouter()
  const [entry, setEntry] = useState<Entry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [currentDateTime, setCurrentDateTime] = useState("")

  // For freewrite entries
  const [content, setContent] = useState("")
  const [visibility, setVisibility] = useState("PRIVATE")
  const [qualityEmoji, setQualityEmoji] = useState("")

  // For guided entries
  const [responses, setResponses] = useState<Record<string, string>>({})

  // Update current date/time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentDateTime(now.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short"
      }))
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (params.id) {
      fetchEntry(params.id as string)
    }
  }, [params.id])

  const fetchEntry = async (entryId: string) => {
    try {
      const response = await fetch(`/api/entries/${entryId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch entry")
      }
      const data = await response.json()
      setEntry(data)
      
      // Set form values based on entry data
      setContent(data.content || "")
      setVisibility(data.visibility || "PRIVATE")
      setQualityEmoji(data.qualityEmoji || "")

      // For guided entries, parse the structured content
      if (data.type === "GUIDED" && data.content) {
        parseGuidedContent(data.content)
      }
    } catch (error) {
      setError("Failed to load entry")
      console.error("Error fetching entry:", error)
    } finally {
      setLoading(false)
    }
  }

  const parseGuidedContent = (content: string) => {
    const sections = content.split(/\*\*(.*?)\*\*/)
    const parsedResponses: Record<string, string> = {}
    
    for (let i = 1; i < sections.length; i += 2) {
      const promptText = sections[i]
      const responseText = sections[i + 1]?.trim() || ""
      const promptIndex = Math.floor(i / 2)
      parsedResponses[promptIndex] = responseText
    }
    
    setResponses(parsedResponses)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError("")

    try {
      let contentToSave = content

      // For guided entries, reconstruct the structured content
      if (entry?.type === "GUIDED" && entry.qualityEmoji) {
        const promptData = moodBasedPrompts[entry.qualityEmoji as keyof typeof moodBasedPrompts]
        if (promptData) {
          contentToSave = promptData.prompts
            .map((promptText, index) => {
              const response = responses[index] || ""
              return `**${promptText}**\n${response}`
            })
            .join("\n\n")
        }
      }

      const response = await fetch(`/api/entries/${entry?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: contentToSave,
          visibility,
          qualityEmoji: qualityEmoji || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update entry")
      }

      router.push(`/entries/${entry?.id}`)
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsSaving(false)
    }
  }

  const handleResponseChange = (promptIndex: number, value: string) => {
    setResponses(prev => ({
      ...prev,
      [promptIndex]: value
    }))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error || !entry) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-indigo-600">
                  ← Digital Diary
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Entry Not Found</h2>
              <p className="text-gray-600 mb-4">{error || "This entry doesn't exist or you don't have permission to edit it."}</p>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Back to Entries
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const promptData = entry.type === "GUIDED" && entry.qualityEmoji 
    ? moodBasedPrompts[entry.qualityEmoji as keyof typeof moodBasedPrompts] 
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-indigo-600">
                ← Digital Diary
              </Link>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">{currentDateTime}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">
                Edit {entry.type === "FREEWRITE" ? "Freewrite" : "Guided"} Entry
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Originally created on {formatDate(entry.createdAt)}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              {/* Freewrite Content */}
              {entry.type === "FREEWRITE" && (
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    What's on your mind?
                  </label>
                  <textarea
                    id="content"
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Start writing about anything that comes to mind..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {content.length} characters
                  </p>
                </div>
              )}

              {/* Guided Content */}
              {entry.type === "GUIDED" && promptData && (
                <div className="space-y-6">
                  {/* Prompt header */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{entry.qualityEmoji}</span>
                      <div>
                        <h3 className="font-medium text-blue-900">{promptData.title}</h3>
                        <p className="text-sm text-blue-700 mt-1">{promptData.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Prompts */}
                  {promptData.prompts.map((promptText, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {promptText}
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Share your thoughts..."
                        value={responses[index] || ""}
                        onChange={(e) => handleResponseChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Mood Assessment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  How was your day today?
                </label>
                <div className="flex justify-center gap-4">
                  {emojiOptions.map((option) => (
                    <button
                      key={option.emoji}
                      type="button"
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        qualityEmoji === option.emoji
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setQualityEmoji(qualityEmoji === option.emoji ? "" : option.emoji)}
                    >
                      <span className="text-3xl mb-1">{option.emoji}</span>
                      <span className="text-xs text-gray-600">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Visibility */}
              <div>
                <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-2">
                  Entry Visibility
                </label>
                <select
                  id="visibility"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                >
                  <option value="PRIVATE">Private - Only you can see this</option>
                  <option value="PROTECTED">Protected - Visible to friends</option>
                  <option value="PUBLIC">Public - Visible to everyone</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Link
                  href={`/entries/${entry.id}`}
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  Cancel
                </Link>
                <div className="flex items-center space-x-3">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
