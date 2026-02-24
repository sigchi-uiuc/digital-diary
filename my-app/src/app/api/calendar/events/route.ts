import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { fetchCalendarEvents } from "@/lib/googleCalendar"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const timeMin = searchParams.get("timeMin") || undefined
    const timeMax = searchParams.get("timeMax") || undefined
    const maxResults = parseInt(searchParams.get("maxResults") || "50")

    const events = await fetchCalendarEvents(session.user.id, timeMin, timeMax, maxResults)

    return NextResponse.json({ events })
  } catch (error: any) {
    console.error("Error fetching calendar events:", error)

    const msg = (error?.message || "").toString().toLowerCase()
    if (
      msg.includes("not connected") ||
      msg.includes("tokens missing") ||
      msg.includes("failed to refresh") ||
      msg.includes("reconnect required")
    ) {
      return NextResponse.json(
        { error: "Google Calendar not connected. Please connect your Google account." },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

