import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { fetchCalendarEvents } from "@/lib/googleCalendar"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const timeMin = body.timeMin || undefined
    const timeMax = body.timeMax || undefined
    const maxResults = body.maxResults || 50

    const events = await fetchCalendarEvents(session.user.id, timeMin, timeMax, maxResults)

    return NextResponse.json({ 
      success: true,
      events,
      syncedAt: new Date().toISOString()
    })
  } catch (error: any) {
    console.error("Error syncing calendar events:", error)

    const msg = (error?.message || "").toString().toLowerCase()
    if (
      msg.includes("not connected") ||
      msg.includes("tokens missing") ||
      msg.includes("failed to refresh") ||
      msg.includes("reconnect required")
    ) {
      const payload: any = { error: "Google Calendar not connected. Please connect your Google account." }
      if (process.env.NODE_ENV !== "production") {
        payload.detail = error?.message || String(error)
        payload.stack = error?.stack
      }
      return NextResponse.json(payload, { status: 401 })
    }

    const payload: any = { error: "Internal server error" }
    if (process.env.NODE_ENV !== "production") {
      payload.detail = error?.message || String(error)
      payload.stack = error?.stack
    }

    return NextResponse.json(payload, { status: 500 })
  }
}

