"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteEntry } from "@/lib/actions/entries"

interface Props {
  entryId: string
}

export default function EntryDeleteButton({ entryId }: Props) {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this entry?")) return
    setDeleting(true)
    try {
      await deleteEntry(entryId)
      router.refresh()
    } catch {
      alert("Failed to delete entry. Please try again.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        handleDelete()
      }}
      disabled={deleting}
      className="glass rounded-xl px-4 py-2 text-red-600 hover:bg-red-50/40 transition-all text-sm font-medium disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  )
}
