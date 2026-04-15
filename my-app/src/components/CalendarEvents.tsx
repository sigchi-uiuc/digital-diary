"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession, signIn } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { checkCalendarConnection, syncCalendarEvents } from "@/lib/actions/calendar"
import { staggerContainer, cardVariant, fadeIn, scaleIn, overlayFade } from "@/lib/animations"
import { CalendarIcon, MapPinIcon } from "@/components/icons"

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

  if (connected === null) {
    return (
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="panel-soft p-6 flex items-center justify-center gap-3 text-[#1a4d3e]/60 text-sm"
      >
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#4A90E2] border-t-transparent" />
        Checking Google Calendar…
      </motion.div>
    )
  }

  if (!connected) {
    return (
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="panel-soft p-8 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#4A90E2]/20 to-[#52C9A2]/20 flex items-center justify-center">
          <CalendarIcon className="w-8 h-8 text-[#4A90E2]" />
        </div>
        <h3 className="text-xl font-bold text-[#1a4d3e] mb-2">Connect Google Calendar</h3>
        <p className="text-[#1a4d3e]/60 text-sm mb-6">
          Sign in with Google to sync your upcoming events
        </p>
        <motion.button
          onClick={connectGoogle}
          className="btn-glossy rounded-2xl px-6 py-2.5 text-sm font-medium text-white"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Connect Google Calendar
        </motion.button>
      </motion.div>
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
        <motion.button
          onClick={syncEvents}
          disabled={syncing || loading}
          className="btn-glossy-green rounded-2xl px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {syncing ? "Syncing…" : "Sync"}
        </motion.button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            key="error"
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass rounded-2xl p-4 border-2 border-red-200/50"
          >
            <p className="text-red-700 text-sm text-center font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex justify-center items-center py-12"
        >
          <div className="glass-strong rounded-3xl px-8 py-6 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#4A90E2] border-t-transparent" />
            <span className="text-[#1a4d3e] font-medium">Loading events…</span>
          </div>
        </motion.div>
      ) : events.length === 0 ? (
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="panel-soft p-8 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[#4A90E2]/15 to-[#52C9A2]/15 flex items-center justify-center">
            <CalendarIcon className="w-8 h-8 text-[#4A90E2]/60" />
          </div>
          <h4 className="text-base font-semibold text-[#1a4d3e] mb-1">No upcoming events</h4>
          <p className="text-sm text-[#1a4d3e]/60">Nothing scheduled in the next 30 days.</p>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariant}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="panel-soft p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#1a4d3e] mb-2 truncate">{event.summary}</h4>
                  <div className="space-y-1 text-sm text-[#1a4d3e]/70">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#4A90E2] shrink-0" />
                      <span>
                        {formatDate(event.start.dateTime || event.start.date)}
                        {event.start.dateTime && ` · ${formatTime(event.start.dateTime)}`}
                        {event.end.dateTime && ` – ${formatTime(event.end.dateTime)}`}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-[#1a4d3e]/60 shrink-0" />
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
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
