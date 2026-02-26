"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

export default function DiaryCalendar() {
  const [date, setDate] = useState<Date | null>(null)
  const router = useRouter()

  const handleDateClick = async (clickedDate: Date) => {
    const formatted = clickedDate.toISOString().split("T")[0]

    const res = await fetch("/api/entries")
    const entries = await res.json()

    const match = entries.find((e: any) =>
      new Date(e.createdAt).toISOString().split("T")[0] === formatted
    )

    if (match) {
      router.push(`/entries/${match.id}`)
    } else {
      alert("No entry for this day")
    }
  }

  return (
    <div className="panel-soft p-6 rounded-2xl shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent">
          Diary Calendar
        </h3>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
        <Calendar
          onClickDay={handleDateClick}
          value={date || new Date()}
          className="w-full rounded-lg"
        />
      </div>
    </div>
  )
}
