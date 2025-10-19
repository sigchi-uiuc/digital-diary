"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CreateFreewriteEntry() {
  const [content, setContent] = useState("")
  const [visibility, setVisibility] = useState("PRIVATE")
  const [qualityScore, setQualityScore] = useState<number | null>(null)
  const [qualityEmoji, setQualityEmoji] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentDateTime, setCurrentDateTime] = useState("")
  const router = useRouter()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "FREEWRITE",
          content,
          visibility,
          qualityScore,
          qualityEmoji: qualityEmoji || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to create entry")
      }

      router.push("/")
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const emojiOptions = ["😊", "😔", "😴", "🤔", "😌", "😤", "😢", "😍", "🤗", "😎", "🥳", "😌", "🙂", "😐", "😕"]

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
              <h1 className="text-2xl font-bold text-gray-900">Freewrite Entry</h1>
              <p className="mt-1 text-sm text-gray-500">
                Express your thoughts freely without structure or prompts
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  What's on your mind?
                </label>
                <textarea
                  id="content"
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Start writing about anything that comes to mind... your thoughts, feelings, experiences, dreams, or just stream of consciousness..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  {content.length} characters
                </p>
              </div>

              {/* Quality Assessment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="qualityScore" className="block text-sm font-medium text-gray-700 mb-2">
                    How was your day? (1-10)
                  </label>
                  <select
                    id="qualityScore"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={qualityScore || ""}
                    onChange={(e) => setQualityScore(e.target.value ? parseInt(e.target.value) : null)}
                  >
                    <option value="">Select a score</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                      <option key={score} value={score}>
                        {score} - {score <= 3 ? "Not great" : score <= 6 ? "Okay" : score <= 8 ? "Good" : "Excellent"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How are you feeling?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {emojiOptions.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className={`w-10 h-10 rounded-full border-2 text-lg hover:scale-110 transition-transform ${
                          qualityEmoji === emoji
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => setQualityEmoji(qualityEmoji === emoji ? "" : emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
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
                  href="/"
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  Cancel
                </Link>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !content.trim()}
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Creating..." : "Create Entry"}
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
