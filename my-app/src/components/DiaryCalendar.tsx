"use client"

import { useMemo, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useSession, signIn } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { scaleIn, fadeIn, staggerContainer, listItem } from "@/lib/animations"
import { checkCalendarConnection, syncCalendarEvents } from "@/lib/actions/calendar"
import { CalendarIcon, MapPinIcon, PenIcon, PlayIcon } from "@/components/icons"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

interface EntryStub {
  id: string
  type: "FREEWRITE" | "GUIDED"
  content: string | null
  qualityEmoji: string | null
  createdAt: Date
}

interface CalendarEvent {
  id: string
  summary: string
  description?: string
  start: { dateTime?: string; date?: string }
  end:   { dateTime?: string; date?: string }
  location?: string
  htmlLink?: string
}

interface Props {
  entries: EntryStub[]
}

function toLocalDateStr(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function eventDateStr(event: CalendarEvent): string {
  const raw = event.start.dateTime ?? event.start.date ?? ""
  return raw ? toLocalDateStr(new Date(raw)) : ""
}

function formatEventTime(event: CalendarEvent): string {
  if (!event.start.dateTime) return "All day"
  const start = new Date(event.start.dateTime)
  const end   = event.end.dateTime ? new Date(event.end.dateTime) : null
  const fmt = (d: Date) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  return end ? `${fmt(start)} – ${fmt(end)}` : fmt(start)
}

function formatTime(d: Date) {
  return new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
}

function previewText(content: string | null) {
  if (!content) return "No content"
  const clean = content.replace(/\*\*/g, "").replace(/\n/g, " ")
  return clean.length > 80 ? clean.slice(0, 80) + "…" : clean
}

function formatSelectedDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number)
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  })
}

export default function DiaryCalendar({ entries }: Props) {
  const { data: session } = useSession()
  const [selectedDate, setSelectedDate]       = useState<string | null>(null)
  const [calEvents, setCalEvents]             = useState<CalendarEvent[]>([])
  const [calConnected, setCalConnected]       = useState<boolean | null>(null)
  const [calLoading, setCalLoading]           = useState(false)

  // Diary entry map
  const entryMap = useMemo(() => {
    const map = new Map<string, EntryStub[]>()
    entries.forEach((e) => {
      const key = toLocalDateStr(new Date(e.createdAt))
      const list = map.get(key) ?? []
      list.push(e)
      map.set(key, list)
    })
    return map
  }, [entries])

  // Calendar event map
  const eventMap = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    calEvents.forEach((ev) => {
      const key = eventDateStr(ev)
      if (!key) return
      const list = map.get(key) ?? []
      list.push(ev)
      map.set(key, list)
    })
    return map
  }, [calEvents])

  const loadCalendarEvents = useCallback(async () => {
    setCalLoading(true)
    try {
      const result = await syncCalendarEvents({ maxResults: 200 })
      setCalEvents(result.events)
    } catch {
      // Non-fatal — calendar stays empty
    } finally {
      setCalLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!session) return
    checkCalendarConnection()
      .then((connected) => {
        setCalConnected(connected)
        if (connected) loadCalendarEvents()
      })
      .catch(() => setCalConnected(false))
  }, [session, loadCalendarEvents])

  const handleDateClick = (clickedDate: Date) => {
    const key = toLocalDateStr(clickedDate)
    setSelectedDate((prev) => (prev === key ? null : key))
  }

  const selectedEntries = selectedDate ? (entryMap.get(selectedDate) ?? []) : []
  const selectedEvents  = selectedDate ? (eventMap.get(selectedDate) ?? []) : []
  const hasAnything     = selectedEntries.length > 0 || selectedEvents.length > 0

  return (
    <motion.div variants={scaleIn} initial="hidden" animate="visible">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-[#1a4d3e]">Diary Calendar</h3>
        <div className="flex items-center gap-2">
          {calConnected === false && (
            <button
              onClick={() => signIn("google", { callbackUrl: window.location.href })}
              className="text-xs glass rounded-xl px-2.5 py-1 text-[#4A90E2] font-medium hover:bg-white/40 transition-all"
            >
              + Connect Google
            </button>
          )}
          {calConnected && (
            <button
              onClick={loadCalendarEvents}
              disabled={calLoading}
              className="text-xs glass rounded-xl px-2.5 py-1 text-[#1a4d3e]/60 hover:bg-white/40 transition-all disabled:opacity-40"
            >
              {calLoading ? "Syncing…" : "Sync"}
            </button>
          )}
        </div>
      </div>

      <Calendar
        onClickDay={handleDateClick}
        value={new Date()}
        className="w-full rounded-xl"
        tileContent={({ date, view }) => {
          if (view !== "month") return null
          const key = toLocalDateStr(date)
          const hasEntries = entryMap.has(key)
          const hasEvents  = eventMap.has(key)
          if (!hasEntries && !hasEvents) return null
          return (
            <div className="flex justify-center gap-0.5 mt-0.5">
              {hasEntries && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1a4d3e]/60" />
              )}
              {hasEvents && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4A90E2]" />
              )}
            </div>
          )
        }}
        tileClassName={({ date, view }) => {
          if (view !== "month") return ""
          return selectedDate === toLocalDateStr(date) ? "!bg-[#4A90E2]/20 !text-[#1a4d3e]" : ""
        }}
      />

      {/* Legend */}
      <div className="flex items-center gap-3 mt-2 px-1">
        <div className="flex items-center gap-1 text-[10px] text-[#1a4d3e]/50">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1a4d3e]/60" />
          Diary entry
        </div>
        <div className="flex items-center gap-1 text-[10px] text-[#1a4d3e]/50">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4A90E2]" />
          Calendar event
        </div>
      </div>

      {/* Selected date panel */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-white/30">
              <h4 className="text-sm font-semibold text-[#1a4d3e] mb-3">
                {formatSelectedDate(selectedDate)}
              </h4>

              {!hasAnything && (
                <motion.div variants={fadeIn} initial="hidden" animate="visible" className="text-center py-4">
                  <p className="text-sm text-[#1a4d3e]/50 mb-2">Nothing on this day</p>
                  <Link
                    href="/entries/create/freewrite"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4A90E2] hover:underline"
                  >
                    <PenIcon className="w-3 h-3" /> Write an entry
                  </Link>
                </motion.div>
              )}

              <motion.div className="space-y-1.5" variants={staggerContainer} initial="hidden" animate="visible">
                {/* Diary entries */}
                {selectedEntries.map((entry) => (
                  <motion.div key={entry.id} variants={listItem}>
                    <Link
                      href={`/entries/${entry.id}`}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/40 transition-all group"
                    >
                      <span className="text-lg shrink-0 mt-0.5">
                        {entry.qualityEmoji || (
                          entry.type === "GUIDED"
                            ? <PlayIcon className="w-4 h-4 text-[#4A90E2] mt-1" />
                            : <PenIcon className="w-4 h-4 text-[#1a4d3e]/40 mt-1" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-medium text-[#1a4d3e]/70">
                            {entry.type === "GUIDED" ? "Guided" : "Freewrite"}
                          </span>
                          <span className="text-[10px] text-[#1a4d3e]/40">
                            {formatTime(entry.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-[#1a4d3e]/70 line-clamp-2 group-hover:text-[#1a4d3e]">
                          {previewText(entry.content)}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                {/* Divider between entries and events */}
                {selectedEntries.length > 0 && selectedEvents.length > 0 && (
                  <div className="border-t border-white/20 my-1" />
                )}

                {/* Google Calendar events */}
                {selectedEvents.map((event) => (
                  <motion.div key={event.id} variants={listItem}>
                    <a
                      href={event.htmlLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/40 transition-all group"
                    >
                      <CalendarIcon className="w-4 h-4 text-[#4A90E2] shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-[#1a4d3e] truncate group-hover:text-[#4A90E2]">
                          {event.summary}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-2 mt-0.5">
                          <span className="text-[10px] text-[#4A90E2]/80">{formatEventTime(event)}</span>
                          {event.location && (
                            <span className="text-[10px] text-[#1a4d3e]/40 flex items-center gap-0.5 truncate">
                              <MapPinIcon className="w-2.5 h-2.5 inline" />
                              {event.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
