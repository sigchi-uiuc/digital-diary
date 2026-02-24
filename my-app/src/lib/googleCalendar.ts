import { google } from "googleapis"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function isInvalidGrantError(error: unknown): boolean {
  const err = error as any
  const message = (err?.message || "").toString().toLowerCase()
  const directError = (err?.error || "").toString().toLowerCase()
  const responseError = (err?.response?.data?.error || "").toString().toLowerCase()
  const causeError = (err?.cause?.error || "").toString().toLowerCase()

  return (
    message.includes("invalid_grant") ||
    directError === "invalid_grant" ||
    responseError === "invalid_grant" ||
    causeError === "invalid_grant"
  )
}

export async function getGoogleCalendarClient(userId: string) {
  // Get the user's Google account from the database
  const account = await prisma.account.findFirst({
    where: {
      userId: userId,
      provider: "google",
    },
  })

  if (!account || !account.refresh_token) {
    throw new Error("Google account not connected or tokens missing")
  }

  // Create OAuth2 client
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.NEXTAUTH_URL || "http://localhost:3000"
  )

  // Set credentials
  oauth2Client.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : undefined,
  })

  // Refresh token if expired
  if (!account.access_token || (account.expires_at && account.expires_at * 1000 < Date.now())) {
    try {
      const { credentials } = await oauth2Client.refreshAccessToken()
      
      // Update tokens in database
      await prisma.account.update({
        where: { id: account.id },
        data: {
          access_token: credentials.access_token || account.access_token,
          refresh_token: credentials.refresh_token || account.refresh_token,
          expires_at: credentials.expiry_date ? Math.floor(credentials.expiry_date / 1000) : account.expires_at,
        },
      })

      oauth2Client.setCredentials(credentials)
    } catch (error) {
      console.error("Error refreshing Google token:", error)

      if (isInvalidGrantError(error)) {
        await prisma.account.update({
          where: { id: account.id },
          data: {
            access_token: null,
            refresh_token: null,
            expires_at: null,
          },
        })

        throw new Error("Google Calendar reconnect required")
      }

      throw new Error("Failed to refresh Google token")
    }
  }

  // Create Calendar client
  const calendar = google.calendar({ version: "v3", auth: oauth2Client })

  return { calendar, oauth2Client }
}

export interface CalendarEvent {
  id: string
  summary: string
  description?: string
  start: {
    dateTime?: string
    date?: string
    timeZone?: string
  }
  end: {
    dateTime?: string
    date?: string
    timeZone?: string
  }
  location?: string
  htmlLink?: string
  status?: string
}

export async function fetchCalendarEvents(
  userId: string,
  timeMin?: string,
  timeMax?: string,
  maxResults: number = 50
): Promise<CalendarEvent[]> {
  try {
    const { calendar } = await getGoogleCalendarClient(userId)

    const now = new Date()
    const defaultTimeMin = timeMin || now.toISOString()
    const defaultTimeMax = timeMax || new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ahead

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: defaultTimeMin,
      timeMax: defaultTimeMax,
      maxResults: maxResults,
      singleEvents: true,
      orderBy: "startTime",
    })

    return (response.data.items || []).map((event) => ({
      id: event.id || "",
      summary: event.summary || "No Title",
      description: event.description || undefined,
      start: {
        dateTime: event.start?.dateTime || undefined,
        date: event.start?.date || undefined,
        timeZone: event.start?.timeZone || undefined,
      },
      end: {
        dateTime: event.end?.dateTime || undefined,
        date: event.end?.date || undefined,
        timeZone: event.end?.timeZone || undefined,
      },
      location: event.location || undefined,
      htmlLink: event.htmlLink || undefined,
      status: event.status || undefined,
    }))
  } catch (error) {
    console.error("Error fetching calendar events:", error)
    throw error
  }
}

export async function isGoogleCalendarConnected(userId: string): Promise<boolean> {
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId: userId,
        provider: "google",
      },
      select: {
        refresh_token: true,
      },
    })
    return !!account?.refresh_token
  } catch (error) {
    return false
  }
}

