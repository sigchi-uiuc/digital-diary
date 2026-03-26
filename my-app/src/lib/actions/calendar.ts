"use server"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { fetchCalendarEvents, isGoogleCalendarConnected } from "@/lib/googleCalendar"

export async function checkCalendarConnection() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized")

  return isGoogleCalendarConnected(session.user.id)
}

export async function syncCalendarEvents(params?: {
  timeMin?: string
  timeMax?: string
  maxResults?: number
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error("Unauthorized")

  const { timeMin, timeMax, maxResults = 50 } = params ?? {}

  const events = await fetchCalendarEvents(session.user.id, timeMin, timeMax, maxResults)

  return {
    success: true,
    events,
    syncedAt: new Date().toISOString(),
  }
}
