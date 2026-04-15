"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { scaleIn, fadeIn, staggerContainer, listItem } from "@/lib/animations"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { PenIcon, PlayIcon } from "@/components/icons"

interface EntryStub {
  id: string
  type: "FREEWRITE" | "GUIDED"
  content: string | null
  qualityEmoji: string | null
  createdAt: Date
}

interface Props {
  entries: EntryStub[]
}

export default function DiaryCalendar({ entries }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const toLocalDateStr = (d: Date) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
  }

  // Map date string → array of entries for that date
  const entryMap = useMemo(() => {
    const map = new Map<string, EntryStub[]>()
    entries.forEach((e) => {
      const key = toLocalDateStr(new Date(e.createdAt))
      const list = map.get(key) || []
      list.push(e)
      map.set(key, list)
    })
    return map
  }, [entries])

  // Set of date strings that have entries (for dot indicators)
  const datesWithEntries = useMemo(() => new Set(entryMap.keys()), [entryMap])

  const handleDateClick = (clickedDate: Date) => {
    const key = toLocalDateStr(clickedDate)
    setSelectedDate((prev) => (prev === key ? null : key))
  }

  const selectedEntries = selectedDate ? (entryMap.get(selectedDate) ?? []) : []

  const formatTime = (d: Date) =>
    new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })

  const formatSelectedDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number)
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  const previewText = (content: string | null) => {
    if (!content) return "No content"
    // Strip markdown bold markers for preview
    const clean = content.replace(/\*\*/g, "").replace(/\n/g, " ")
    return clean.length > 80 ? clean.slice(0, 80) + "…" : clean
  }

  return (
    <motion.div variants={scaleIn} initial="hidden" animate="visible">
      <Calendar
        onClickDay={handleDateClick}
        value={new Date()}
        className="w-full rounded-xl"
        tileContent={({ date, view }) => {
          if (view !== "month") return null
          const key = toLocalDateStr(date)
          if (!datesWithEntries.has(key)) return null
          const count = entryMap.get(key)!.length
          return (
            <div className="flex justify-center mt-0.5">
              <span
                className={`inline-block rounded-full bg-[#4A90E2] ${
                  count > 1 ? "text-[9px] text-white w-4 h-4 leading-4 text-center" : "w-1.5 h-1.5"
                }`}
              >
                {count > 1 ? count : ""}
              </span>
            </div>
          )
        }}
        tileClassName={({ date, view }) => {
          if (view !== "month") return ""
          const key = toLocalDateStr(date)
          return selectedDate === key ? "!bg-[#4A90E2]/20 !text-[#1a4d3e]" : ""
        }}
      />

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
              <h4 className="text-sm font-semibold text-[#1a4d3e] mb-2">
                {formatSelectedDate(selectedDate)}
              </h4>

              {selectedEntries.length === 0 ? (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="text-center py-4"
                >
                  <p className="text-sm text-[#1a4d3e]/50 mb-2">No entries this day</p>
                  <Link
                    href="/entries/create/freewrite"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4A90E2] hover:underline"
                  >
                    <PenIcon className="w-3 h-3" /> Write one now
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  className="space-y-2"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {selectedEntries.map((entry) => (
                    <motion.div key={entry.id} variants={listItem}>
                      <Link
                        href={`/entries/${entry.id}`}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/40 transition-all group"
                      >
                        {/* Emoji or type icon */}
                        <span className="text-lg shrink-0 mt-0.5">
                          {entry.qualityEmoji || (entry.type === "GUIDED" ? <PlayIcon className="w-4 h-4 text-[#4A90E2] mt-1" /> : <PenIcon className="w-4 h-4 text-[#1a4d3e]/40 mt-1" />)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-medium text-[#4A90E2]">
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
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
