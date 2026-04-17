"use client"

import DiaryCalendar from "@/components/DiaryCalendar"

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

export default function CalendarSection({ entries }: Props) {
  return (
    <div className="panel-soft p-4">
      <h3 className="text-lg font-semibold text-[#1a4d3e] mb-2">Diary Calendar</h3>
      <DiaryCalendar entries={entries} />
    </div>
  )
}
