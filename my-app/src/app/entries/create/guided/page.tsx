"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const guidedPrompts = [
  {
    id: "gratitude",
    title: "Gratitude Reflection",
    description: "Reflect on what you're grateful for today",
    prompts: [
      "What are three things you're grateful for today?",
      "How did someone make your day better?",
      "What small moment brought you joy?",
      "What are you looking forward to?"
    ]
  },
  {
    id: "reflection",
    title: "Daily Reflection",
    description: "Look back on your day and process your experiences",
    prompts: [
      "What was the highlight of your day?",
      "What challenged you today?",
      "What did you learn about yourself?",
      "How did you grow or change today?"
    ]
  },
  {
    id: "goals",
    title: "Goal Setting",
    description: "Plan and reflect on your personal goals",
    prompts: [
      "What did you accomplish today?",
      "What goals do you want to work on tomorrow?",
      "What obstacles are you facing?",
      "How can you overcome these challenges?"
    ]
  },
  {
    id: "emotions",
    title: "Emotional Check-in",
    description: "Explore and process your emotions",
    prompts: [
      "What emotions did you experience today?",
      "What triggered these emotions?",
      "How did you handle difficult feelings?",
      "What would you do differently next time?"
    ]
  },
  {
    id: "relationships",
    title: "Relationship Reflection",
    description: "Think about your connections with others",
    prompts: [
      "Who did you connect with today?",
      "How did you show care for someone?",
      "What relationship needs attention?",
      "How can you strengthen your connections?"
    ]
  }
]

export default function CreateGuidedEntry() {
  const [selectedPrompt, setSelectedPrompt] = useState("")
  const [responses, setResponses] = useState<Record<string, string>>({})
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

  const handlePromptChange = (promptId: string) => {
    setSelectedPrompt(promptId)
    setResponses({})
  }

  const handleResponseChange = (promptIndex: number, value: string) => {
    setResponses(prev => ({
      ...prev,
      [promptIndex]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const prompt = guidedPrompts.find(p => p.id === selectedPrompt)
    if (!prompt) {
      setError("Please select a guided prompt")
      setIsLoading(false)
      return
    }

    // Combine all responses into structured content
    const structuredContent = prompt.prompts
      .map((promptText, index) => {
        const response = responses[index] || ""
        return `**${promptText}**\n${response}`
      })
      .join("\n\n")

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "GUIDED",
          content: structuredContent,
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
  const selectedPromptData = guidedPrompts.find(p => p.id === selectedPrompt)

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
              <h1 className="text-2xl font-bold text-gray-900">Guided Entry</h1>
              <p className="mt-1 text-sm text-gray-500">
                Follow prompts and structure to explore your thoughts and feelings
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              {/* Prompt Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose a guided prompt:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guidedPrompts.map((prompt) => (
                    <button
                      key={prompt.id}
                      type="button"
                      onClick={() => handlePromptChange(prompt.id)}
                      className={`p-4 text-left border-2 rounded-lg transition-colors ${
                        selectedPrompt === prompt.id
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <h3 className="font-medium text-gray-900">{prompt.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{prompt.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guided Prompts */}
              {selectedPromptData && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900">{selectedPromptData.title}</h3>
                    <p className="text-sm text-blue-700 mt-1">{selectedPromptData.description}</p>
                  </div>

                  {selectedPromptData.prompts.map((promptText, index) => (
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

              {/* Quality Assessment */}
              {selectedPromptData && (
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
              )}

              {/* Visibility */}
              {selectedPromptData && (
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
              )}

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
                    disabled={isLoading || !selectedPromptData || Object.keys(responses).length === 0}
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
