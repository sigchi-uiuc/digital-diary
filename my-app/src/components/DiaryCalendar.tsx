"use client"

import { useRouter } from "next/navigation"
import Calendar from "react-calendar"
import { getEntries } from "@/lib/actions/entries"
import "react-calendar/dist/Calendar.css"

export default function DiaryCalendar() {
  const router = useRouter()

  const toLocalDateStr = (d: Date) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
  }

  const handleDateClick = async (clickedDate: Date) => {
    const formatted = toLocalDateStr(clickedDate)
    const entries = await getEntries()
    const match = entries.find(
      (e) => toLocalDateStr(new Date(e.createdAt)) === formatted
    )
    if (match) {
      router.push(`/entries/${match.id}`)
    } else {
      alert("No entry for this day")
    }
  }

  return (
    <div className="glass rounded-2xl p-4">
      <Calendar
        onClickDay={handleDateClick}
        value={new Date()}
        className="w-full rounded-xl"
      />
    </div>
  )
}
