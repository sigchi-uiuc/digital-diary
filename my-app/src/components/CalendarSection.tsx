"use client"

import { useState } from "react"
import { Suspense } from "react"
import CalendarEvents from "@/components/CalendarEvents"
import DiaryCalendar from "@/components/DiaryCalendar"

interface EntryStub {
  id: string
  createdAt: Date
}

interface Props {
  entries: EntryStub[]
}

export default function CalendarSection({ entries }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <div className="space-y-8">
      <Suspense fallback={<div className="panel-soft skeleton h-48 rounded-2xl" />}>
        <CalendarEvents selectedDate={selectedDate} />
      </Suspense>
      <div className="panel-soft p-4">
        <h3 className="text-lg font-semibold text-[#1a4d3e] mb-2">Diary Calendar</h3>
        <DiaryCalendar entries={entries} onDateSelect={setSelectedDate} />
      </div>
    </div>
  )
}
