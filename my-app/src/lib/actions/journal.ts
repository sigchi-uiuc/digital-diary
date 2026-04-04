"use server"

import { getAppSession } from "@/lib/auth"
import { generateJournalQuestions } from "@/lib/journalQuestions"
import Anthropic from "@anthropic-ai/sdk"
import { fetchCalendarEvents } from "@/lib/googleCalendar"
import { WeatherData } from "@/lib/weather"

function getTodayDateRange() {
  const now = new Date()
  return {
    timeMin: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).toISOString(),
    timeMax: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).toISOString(),
  }
}

export async function getJournalQuestions(qualityScore?: number | null) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  let validatedScore: number | null = null
  if (qualityScore !== undefined && qualityScore !== null) {
    if (!isNaN(qualityScore) && qualityScore >= 1 && qualityScore <= 10) {
      validatedScore = qualityScore
    }
  }

  try {
    const questions = await generateJournalQuestions(session.user.id, validatedScore)
    return { questions, count: questions.length }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : ""
    if (msg.includes("not connected") || msg.includes("tokens missing")) {
      return { questions: [], count: 0 }
    }
    throw error
  }
}

export async function generateFollowUpQuestions(params: {
  prompts: string[]
  responses: string[]
  mood?: string
  weather?: WeatherData | null
}) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const { prompts, responses, mood, weather } = params

  if (!prompts?.length || !responses?.length) throw new Error("Prompts and responses are required")

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured")

  const anthropic = new Anthropic({ apiKey })
  const now = new Date()

  let calendarEventsContext = ""
  let hasEvents = false
  let hasPastEvents = false
  let hasUpcomingEvents = false

  try {
    const { timeMin, timeMax } = getTodayDateRange()
    const events = await fetchCalendarEvents(session.user.id, timeMin, timeMax, 20)

    if (events.length > 0) {
      hasEvents = true
      const pastEvents: string[] = []
      const upcomingEvents: string[] = []

      events.forEach((event, index) => {
        const eventStartTime = event.start.dateTime
          ? new Date(event.start.dateTime)
          : event.start.date
          ? new Date(event.start.date)
          : null

        const startTime = event.start.dateTime
          ? new Date(event.start.dateTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
          : event.start.date || "All day"
        const location = event.location ? ` at ${event.location}` : ""
        const description = event.description
          ? ` (${event.description.substring(0, 100)}${event.description.length > 100 ? "..." : ""})`
          : ""

        const eventString = `${index + 1}. "${event.summary}" - ${startTime}${location}${description}`

        if (eventStartTime && eventStartTime < now) {
          pastEvents.push(eventString)
          hasPastEvents = true
        } else {
          upcomingEvents.push(eventString)
          hasUpcomingEvents = true
        }
      })

      let eventsList = ""
      if (pastEvents.length > 0) eventsList += `Past Events (already occurred today):\n${pastEvents.join("\n")}`
      if (upcomingEvents.length > 0) {
        if (eventsList) eventsList += "\n\n"
        eventsList += `Upcoming Events (scheduled for later today):\n${upcomingEvents.join("\n")}`
      }

      calendarEventsContext = `\n\nToday's Calendar Events:\n${eventsList}\n\nIMPORTANT: Generate at least one question specifically about one or more of these exact calendar events. Reference the event name(s) and ask about specific details, feelings, or experiences related to those particular events.`
    }
  } catch {
    // Continue without calendar events
  }

  const responsesContext = prompts
    .map((prompt, index) => {
      const response = responses[index] || ""
      if (!response.trim()) return null
      return `Q: ${prompt}\nA: ${response}`
    })
    .filter(Boolean)
    .join("\n\n")

  if (!responsesContext) throw new Error("No valid responses provided")

  const moodContext = mood ? `The user's current mood is: ${mood}` : ""

  let weatherContext = ""
  let hasWeather = false
  if (weather && typeof weather === "object") {
    if (weather.city && weather.condition) {
      hasWeather = true
      const tempStr = weather.temperature !== null ? `${weather.temperature}°F` : ""
      const weatherStr = [tempStr, weather.condition].filter(Boolean).join(", ")
      weatherContext = `\n\nToday's Weather in ${weather.city}${weather.state ? `, ${weather.state}` : ""}: ${weatherStr}${weather.description ? ` - ${weather.description}` : ""}`
    }
  }

  const prompt = `You are a thoughtful journaling assistant. Based on the user's journal responses, generate 2-4 personalized, deep follow-up questions that will help them explore their thoughts and feelings more deeply.

${moodContext}

User's Journal Responses:
${responsesContext}${calendarEventsContext}${weatherContext}

Instructions:
- Generate 2-4 follow-up questions that are personalized based on what the user shared
- Questions should dive deeper into themes, emotions, or experiences mentioned in their responses
- Ask about patterns, deeper meanings, or connections
- Be empathetic and supportive
- Questions should encourage reflection and self-discovery
- Avoid repeating the original questions
- Make questions specific to what they shared, not generic
- If they mentioned challenges, ask about coping strategies or support needs
- If they mentioned positive experiences, ask about what made them meaningful
${hasEvents ? `- IMPORTANT: Include at least one question specifically about one or more of the exact calendar events listed above. Reference the event name(s) and ask about specific details, feelings, or experiences related to those particular events.
${hasPastEvents ? "- For PAST events (already occurred), ask about how they went, what happened, memorable moments, or how they felt." : ""}
${hasUpcomingEvents ? "- For UPCOMING events (scheduled for later), ask about anticipation, preparation, expectations, or feelings about the event. DO NOT ask questions that assume the event has already happened." : ""}` : ""}
${hasWeather ? `- IMPORTANT: Include at least one question about how the user's overall mood throughout the day correlated with the weather in their current city.` : ""}

Return only the questions, one per line, without numbering or bullet points.`

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  })

  const content = message.content[0]
  if (content.type === "text") {
    const questions = content.text
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0 && !q.match(/^\d+[.)]/) )
      .slice(0, 4)
      .map((text) => text.replace(/^[-•*]\s*/, ""))
      .filter((q) => q.length > 0)

    return { questions, count: questions.length }
  }

  return { questions: [], count: 0 }
}
