"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { moodBasedPrompts, emojiOptions } from "@/lib/guidedPrompts"

export default function CreateGuidedEntry() {
  const [currentStep, setCurrentStep] = useState<'mood' | 'prompts'>('mood')
  const [selectedMood, setSelectedMood] = useState("")
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [visibility, setVisibility] = useState("PRIVATE")
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

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood)
    setCurrentStep('prompts')
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

    if (!selectedMood) {
      setError("Please select your mood")
      setIsLoading(false)
      return
    }

    const promptData = moodBasedPrompts[selectedMood as keyof typeof moodBasedPrompts]
    if (!promptData) {
      setError("Invalid mood selection")
      setIsLoading(false)
      return
    }

    // Combine all responses into structured content
    const structuredContent = promptData.prompts
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
          qualityEmoji: selectedMood,
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

  const selectedPromptData = selectedMood ? moodBasedPrompts[selectedMood as keyof typeof moodBasedPrompts] : null

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

              {/* Step 1: Mood Selection */}
              {currentStep === 'mood' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      How are you feeling right now?
                    </h2>
                    <p className="text-gray-600">
                      Your mood will help us provide the most relevant questions for you
                    </p>
                  </div>

                  <div className="flex justify-center gap-4">
                    {emojiOptions.map((option) => (
                      <button
                        key={option.emoji}
                        type="button"
                        onClick={() => handleMoodSelection(option.emoji)}
                        className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all hover:scale-105"
                      >
                        <span className="text-4xl mb-2">{option.emoji}</span>
                        <span className="text-sm text-gray-700 font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Guided Prompts */}
              {currentStep === 'prompts' && selectedPromptData && (
                <div className="space-y-6">
                  {/* Back button */}
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('mood')}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to mood selection
                    </button>
                  </div>

                  {/* Prompt header */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{selectedMood}</span>
                      <div>
                        <h3 className="font-medium text-blue-900">{selectedPromptData.title}</h3>
                        <p className="text-sm text-blue-700 mt-1">{selectedPromptData.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Prompts */}
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
                </div>
              )}

              {/* Actions */}
              {currentStep === 'prompts' && (
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
                      disabled={isLoading || !selectedMood || Object.keys(responses).length === 0}
                      className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Creating..." : "Create Entry"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
