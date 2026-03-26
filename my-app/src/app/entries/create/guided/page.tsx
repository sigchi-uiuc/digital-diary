"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { moodBasedPrompts, emojiOptions, getDayActivityQuestions } from "@/lib/guidedPrompts"
import GestureEmoji from "@/components/GestureEmoji"
import { createEntry } from "@/lib/actions/entries"
import { generateFollowUpQuestions } from "@/lib/actions/journal"

export default function CreateGuidedEntry() {
  const [currentStep, setCurrentStep] = useState<"mood" | "prompts" | "confirm-followup" | "followup">("mood")
  const [selectedMood, setSelectedMood] = useState("")
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([])
  const [followUpResponses, setFollowUpResponses] = useState<Record<string, string>>({})
  const [isGeneratingFollowUp, setIsGeneratingFollowUp] = useState(false)
  const [visibility, setVisibility] = useState("PRIVATE")
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

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood)
    setCurrentStep("prompts")
  }

  const handleFinalSubmit = async () => {
    if (!selectedMood) {
      setError("Please select your mood")
      return
    }

    setIsLoading(true)
    setError("")

    const promptData = moodBasedPrompts[selectedMood as keyof typeof moodBasedPrompts]
    if (!promptData) {
      setError("Invalid mood selection")
      setIsLoading(false)
      return
    }

    const allPrompts = [...promptData.prompts, ...getDayActivityQuestions()]

    const initialContent = allPrompts
      .map((promptText, index) => `**${promptText}**\n${responses[index] || ""}`)
      .join("\n\n")

    let followUpContent = ""
    if (followUpQuestions.length > 0) {
      followUpContent =
        "\n\n## Follow-up Questions\n\n" +
        followUpQuestions
          .map((question, index) => `**${question}**\n${followUpResponses[index] || ""}`)
          .join("\n\n")
    }

    try {
      await createEntry({
        type: "GUIDED",
        content: initialContent + followUpContent,
        visibility,
        qualityEmoji: selectedMood,
      })
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateFollowUp = async () => {
    if (!selectedMood) return

    const promptData = moodBasedPrompts[selectedMood as keyof typeof moodBasedPrompts]
    if (!promptData) return

    const allPrompts = [...promptData.prompts, ...getDayActivityQuestions()]
    const allResponses = allPrompts.map((_, index) => responses[index] || "")

    setIsGeneratingFollowUp(true)
    setError("")

    try {
      const result = await generateFollowUpQuestions({
        prompts: allPrompts,
        responses: allResponses,
        mood: selectedMood,
      })

      if (result.questions && result.questions.length > 0) {
        setFollowUpQuestions(result.questions)
        setCurrentStep("followup")
      } else {
        await handleFinalSubmit()
      }
    } catch {
      await handleFinalSubmit()
    } finally {
      setIsGeneratingFollowUp(false)
    }
  }

  const handleConfirmFollowup = async (wantsFollowup: boolean) => {
    if (wantsFollowup) {
      await handleGenerateFollowUp()
    } else {
      await handleFinalSubmit()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === "prompts") {
      setCurrentStep("confirm-followup")
    } else if (currentStep === "followup") {
      await handleFinalSubmit()
    }
  }

  const selectedPromptData = selectedMood
    ? {
        ...moodBasedPrompts[selectedMood as keyof typeof moodBasedPrompts],
        prompts: [
          ...moodBasedPrompts[selectedMood as keyof typeof moodBasedPrompts].prompts,
          ...getDayActivityQuestions(),
        ],
      }
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
              <h1 className="text-2xl font-bold text-[#1a4d3e]">Guided Entry</h1>
              <p className="mt-1 text-sm text-[#1a4d3e]/60">
                Follow prompts and structure to explore your thoughts and feelings
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="glass-strong rounded-2xl border border-red-200/50 p-4">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Step 1: Mood Selection */}
              {currentStep === "mood" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-[#1a4d3e] mb-2">
                      How are you feeling right now?
                    </h2>
                    <p className="text-[#1a4d3e]/60">
                      Your mood will help us provide the most relevant questions for you
                    </p>
                  </div>

                  <div className="flex justify-center gap-3 flex-wrap">
                    {emojiOptions.map((option) => (
                      <button
                        key={option.emoji}
                        type="button"
                        onClick={() => handleMoodSelection(option.emoji)}
                        className="flex flex-col items-center p-4 rounded-2xl border-2 border-white/50 glass hover:border-[#4A90E2] hover:bg-[#4A90E2]/10 transition-all hover:scale-105"
                      >
                        <span className="text-4xl mb-2">{option.emoji}</span>
                        <span className="text-sm text-[#1a4d3e] font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-white/20 pt-6">
                    <p className="text-center text-sm text-[#1a4d3e]/60 mb-3">
                      Or indicate with a hand gesture: thumbs up, sideways, or down
                    </p>
                    <GestureEmoji onGestureSelect={handleMoodSelection} />
                  </div>
                </div>
              )}

              {/* Step 2: Guided Prompts */}
              {currentStep === "prompts" && selectedPromptData && (
                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("mood")}
                    className="flex items-center text-[#4A90E2] hover:text-[#3a7fd2] text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to mood selection
                  </button>

                  <div className="panel-soft p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{selectedMood}</span>
                      <div>
                        <h3 className="font-semibold text-[#1a4d3e]">{selectedPromptData.title}</h3>
                        <p className="text-sm text-[#1a4d3e]/70 mt-1">{selectedPromptData.description}</p>
                      </div>
                    </div>
                  </div>

                  {selectedPromptData.prompts.map((promptText, index) => (
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
                </div>
              )}

              {/* Step 2.5: Confirm Follow-up */}
              {currentStep === "confirm-followup" && (
                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("prompts")}
                    className="flex items-center text-[#4A90E2] hover:text-[#3a7fd2] text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to questions
                  </button>

                  <div className="panel-soft p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🤖</div>
                      <h3 className="text-lg font-semibold text-[#1a4d3e] mb-2">
                        Would you like AI-generated follow-up questions?
                      </h3>
                      <p className="text-sm text-[#1a4d3e]/70 mb-6">
                        Our AI can analyze your responses and generate personalized questions to help you
                        explore your thoughts more deeply.
                      </p>

                      <div className="flex justify-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleConfirmFollowup(false)}
                          disabled={isLoading}
                          className="glass rounded-2xl px-6 py-3 text-sm font-medium text-[#1a4d3e] hover:bg-white/40 transition-all disabled:opacity-50"
                        >
                          No, save entry
                        </button>
                        <button
                          type="button"
                          onClick={() => handleConfirmFollowup(true)}
                          disabled={isGeneratingFollowUp || isLoading}
                          className="btn-glossy rounded-2xl px-6 py-3 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGeneratingFollowUp ? "Generating..." : "Yes, generate questions"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Follow-up Questions */}
              {currentStep === "followup" && followUpQuestions.length > 0 && (
                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("confirm-followup")}
                    className="flex items-center text-[#4A90E2] hover:text-[#3a7fd2] text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>

                  <div className="panel-soft p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">💭</span>
                      <div>
                        <h3 className="font-semibold text-[#1a4d3e]">Personalized Follow-up Questions</h3>
                        <p className="text-sm text-[#1a4d3e]/70 mt-1">
                          Based on your responses, here are some deeper questions to explore
                        </p>
                      </div>
                    </div>
                  </div>

                  {followUpQuestions.map((question, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-[#1a4d3e] mb-2">
                        {question}
                      </label>
                      <textarea
                        rows={4}
                        className="input-glass w-full px-4 py-3 focus:ring-2 focus:ring-[#4A90E2] resize-none"
                        placeholder="Share your thoughts..."
                        value={followUpResponses[index] || ""}
                        onChange={(e) =>
                          setFollowUpResponses((prev) => ({ ...prev, [index]: e.target.value }))
                        }
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              {currentStep === "prompts" && (
                <div className="flex items-center justify-between pt-6 border-t border-white/20">
                  <Link
                    href="/"
                    className="glass rounded-2xl px-4 py-2 text-sm font-medium text-[#1a4d3e] hover:bg-white/40 transition-all"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={!selectedMood || Object.keys(responses).length === 0}
                    className="btn-glossy rounded-2xl px-6 py-2.5 text-white font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              )}

              {currentStep === "followup" && (
                <div className="flex items-center justify-between pt-6 border-t border-white/20">
                  <Link
                    href="/"
                    className="glass rounded-2xl px-4 py-2 text-sm font-medium text-[#1a4d3e] hover:bg-white/40 transition-all"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-glossy rounded-2xl px-6 py-2.5 text-white font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Creating..." : "Create Entry"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
