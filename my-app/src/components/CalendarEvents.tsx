"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession, signIn } from "next-auth/react"
import { checkCalendarConnection, syncCalendarEvents } from "@/lib/actions/calendar"

interface CalendarEvent {
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

export default function CalendarEvents() {
  const { data: session } = useSession()
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [connected, setConnected] = useState<boolean | null>(null)
  const [error, setError] = useState("")

  const checkConnection = useCallback(async () => {
    try {
      const isConnected = await checkCalendarConnection()
      setConnected(isConnected)
      return isConnected
    } catch {
      setConnected(false)
      return false
    }
  }, [])

  const loadEvents = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const result = await syncCalendarEvents({ maxResults: 50 })
      setEvents(result.events)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load calendar events"
      if (msg.toLowerCase().includes("reconnect")) {
        setConnected(false)
      }
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  const syncEvents = useCallback(async () => {
    setSyncing(true)
    setError("")
    try {
      const result = await syncCalendarEvents({ maxResults: 50 })
      setEvents(result.events)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to sync calendar events"
      if (msg.toLowerCase().includes("reconnect")) {
        setConnected(false)
      }
      setError(msg)
    } finally {
      setSyncing(false)
    }
  }, [])

  // On mount: check connection, then auto-load events if connected
  useEffect(() => {
    if (!session) return
    checkConnection().then((isConnected) => {
      if (isConnected) loadEvents()
    })
  }, [session, checkConnection, loadEvents])

  const connectGoogle = async () => {
    await signIn("google", {
      callbackUrl: window.location.href,
      redirect: true,
    })
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No date"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  }

  if (!session) return null

  // Still checking connection
  if (connected === null) {
    return (
      <div className="panel-soft p-6 flex items-center justify-center gap-3 text-[#1a4d3e]/60 text-sm">
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#4A90E2] border-t-transparent" />
        Checking Google Calendar…
      </div>
    )
  }

  if (!connected) {
    return (
      <div className="panel-soft p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#4A90E2]/20 to-[#52C9A2]/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#4A90E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#1a4d3e] mb-2">Connect Google Calendar</h3>
        <p className="text-[#1a4d3e]/60 text-sm mb-6">
          Sign in with Google to sync your upcoming events
        </p>
        <button
          onClick={connectGoogle}
          className="btn-glossy rounded-2xl px-6 py-2.5 text-sm font-medium text-white"
        >
          Connect Google Calendar
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent">
            Calendar Events
          </h3>
          <p className="text-sm text-[#1a4d3e]/60 mt-0.5">Your upcoming Google Calendar events</p>
        </div>
        <button
          onClick={syncEvents}
          disabled={syncing || loading}
          className="btn-glossy-green rounded-2xl px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {syncing ? "Syncing…" : "Sync"}
        </button>
      </div>

      {error && (
        <div className="glass rounded-2xl p-4 border-2 border-red-200/50">
          <p className="text-red-700 text-sm text-center font-medium">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="glass-strong rounded-3xl px-8 py-6 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#4A90E2] border-t-transparent" />
            <span className="text-[#1a4d3e] font-medium">Loading events…</span>
          </div>
        </div>
      ) : events.length === 0 ? (
        <div className="panel-soft p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[#4A90E2]/15 to-[#52C9A2]/15 flex items-center justify-center">
            <svg className="w-8 h-8 text-[#4A90E2]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 className="text-base font-semibold text-[#1a4d3e] mb-1">No upcoming events</h4>
          <p className="text-sm text-[#1a4d3e]/60">Nothing scheduled in the next 30 days.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="panel-soft p-5 hover:scale-[1.01] transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#1a4d3e] mb-2 truncate">{event.summary}</h4>
                  <div className="space-y-1 text-sm text-[#1a4d3e]/70">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>
                        {formatDate(event.start.dateTime || event.start.date)}
                        {event.start.dateTime && ` · ${formatTime(event.start.dateTime)}`}
                        {event.end.dateTime && ` – ${formatTime(event.end.dateTime)}`}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                    {event.description && (
                      <p className="mt-1.5 text-xs text-[#1a4d3e]/50 line-clamp-2">{event.description}</p>
                    )}
                  </div>
                </div>
                {event.htmlLink && (
                  <a
                    href={event.htmlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass rounded-xl px-3 py-1.5 text-xs font-medium text-[#1a4d3e] hover:bg-white/40 transition-all shrink-0"
                  >
                    Open ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
