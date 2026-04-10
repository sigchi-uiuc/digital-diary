"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { scaleIn } from "@/lib/animations"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

interface EntryStub {
  id: string
  createdAt: Date
}

interface Props {
  entries: EntryStub[]
}

export default function DiaryCalendar({ entries }: Props) {
  const router = useRouter()

  const toLocalDateStr = (d: Date) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
  }

  const entryMap = useMemo(() => {
    const map = new Map<string, string>()
    entries.forEach((e) => {
      map.set(toLocalDateStr(new Date(e.createdAt)), e.id)
    })
    return map
  }, [entries])

  const handleDateClick = (clickedDate: Date) => {
    const id = entryMap.get(toLocalDateStr(clickedDate))
    if (id) {
      router.push(`/entries/${id}`)
    } else {
      alert("No entry for this day")
    }
  }

  return (
    <motion.div
      className="rounded-2xl"
      variants={scaleIn}
      initial="hidden"
      animate="visible"
    >
      <Calendar
        onClickDay={handleDateClick}
        value={new Date()}
        className="w-full rounded-xl"
      />
    </motion.div>
  )
}
