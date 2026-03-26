"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

interface Entry {
  id: string
  type: "FREEWRITE" | "GUIDED"
  content: string | null
  visibility: "PRIVATE" | "PUBLIC" | "PROTECTED"
  qualityEmoji: string | null
  mediaUrls: string[]
  createdAt: string
  updatedAt: string
}

export default function EntriesList() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      fetchEntries()
    }
  }, [session])

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/entries")
      if (!response.ok) {
        throw new Error("Failed to fetch entries")
      }
      const data = await response.json()
      setEntries(data)
    } catch (error) {
      setError("Failed to load entries")
      console.error("Error fetching entries:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteEntry = async (entryId: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) {
      return
    }

    try {
      const response = await fetch(`/api/entries/${entryId}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error("Failed to delete entry")
      }

      setEntries(entries.filter(entry => entry.id !== entryId))
    } catch (error) {
      setError("Failed to delete entry")
      console.error("Error deleting entry:", error)
    }
  }

  const stripMarkdown = (text: string): string => {
    return text
      .replace(/^#{1,6}\s+/gm, "")       // headings
      .replace(/\*\*(.+?)\*\*/g, "$1")    // bold
      .replace(/\*(.+?)\*/g, "$1")        // italic
      .replace(/~~(.+?)~~/g, "$1")        // strikethrough
      .replace(/`(.+?)`/g, "$1")          // inline code
      .replace(/\[(.+?)\]\(.+?\)/g, "$1") // links
      .replace(/!\[.*?\]\(.+?\)/g, "")    // images
      .replace(/^>\s+/gm, "")             // blockquotes
      .replace(/^[-*+]\s+/gm, "")         // unordered lists
      .replace(/^\d+\.\s+/gm, "")         // ordered lists
      .replace(/\n{2,}/g, " ")            // multiple newlines
      .trim()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="glass-strong rounded-3xl px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#4A90E2] border-t-transparent"></div>
            <div className="text-[#1a4d3e] font-medium">Loading entries...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-strong rounded-3xl p-6 border-2 border-red-200/50">
        <p className="text-red-700 font-medium mb-4">{error}</p>
        <button
          onClick={fetchEntries}
          className="btn-glossy rounded-2xl px-4 py-2 text-sm text-white"
        >
          Try again
        </button>
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="panel-soft p-12 max-w-md mx-auto">
          <div className="text-7xl mb-6">📝</div>
          <h3 className="text-2xl font-bold text-[#1a4d3e] mb-3">No entries yet</h3>
          <p className="text-[#1a4d3e]/70">Start your digital diary journey by creating your first entry.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {entries.map((entry) => (
        <div key={entry.id} className="panel-soft hover:scale-[1.02] transition-all duration-300 droplet">
          <Link href={`/entries/${entry.id}`} className="block p-6">
            <div className="flex items-center space-x-3 mb-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                entry.type === "FREEWRITE" 
                  ? "bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white shadow-lg" 
                  : "bg-gradient-to-r from-[#52C9A2] to-[#63D4B3] text-white shadow-lg"
              }`}>
                {entry.type === "FREEWRITE" ? "Freewrite" : "Guided"}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                entry.visibility === "PUBLIC"
                  ? "bg-gradient-to-r from-[#52C9A2] to-[#63D4B3] text-white"
                  : entry.visibility === "PROTECTED"
                  ? "bg-gradient-to-r from-[#FFD93D] to-[#FFE66D] text-[#1a4d3e]"
                  : "glass text-[#1a4d3e]"
              }`}>
                {entry.visibility.toLowerCase()}
              </span>
              {entry.qualityEmoji && (
                <span className="text-2xl">{entry.qualityEmoji}</span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-[#1a4d3e] mb-3">
              Entry from {formatDate(entry.createdAt)}
            </h3>
            
            <p className="text-[#1a4d3e]/80 text-sm mb-4 line-clamp-3">
              {entry.content ? stripMarkdown(entry.content) : "No content"}
            </p>
            
            {/* Media preview */}
            {entry.mediaUrls && entry.mediaUrls.length > 0 && (
              <div className="flex gap-2 mb-4">
                {entry.mediaUrls.slice(0, 3).map((url, index) => {
                  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
                  return isImage ? (
                    <img
                      key={index}
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg border border-[#1a4d3e]/20"
                    />
                  ) : (
                    <div
                      key={index}
                      className="w-16 h-16 bg-[#1a4d3e]/10 rounded-lg border border-[#1a4d3e]/20 flex items-center justify-center"
                    >
                      <span className="text-xs">🎥</span>
                    </div>
                  )
                })}
                {entry.mediaUrls.length > 3 && (
                  <div className="w-16 h-16 bg-[#1a4d3e]/10 rounded-lg border border-[#1a4d3e]/20 flex items-center justify-center">
                    <span className="text-xs text-[#1a4d3e]/70">+{entry.mediaUrls.length - 3}</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex items-center text-xs text-[#1a4d3e]/60">
              <span>Created: {formatDate(entry.createdAt)}</span>
              {entry.updatedAt !== entry.createdAt && (
                <>
                  <span className="mx-2">•</span>
                  <span>Updated: {formatDate(entry.updatedAt)}</span>
                </>
              )}
            </div>
          </Link>
          
          {/* Action buttons - positioned outside the clickable area */}
          <div className="px-6 pb-6 flex items-center justify-end space-x-3">
            <Link
              href={`/entries/${entry.id}/edit`}
              className="glass rounded-xl px-4 py-2 text-[#1a4d3e] hover:bg-white/40 transition-all text-sm font-medium"
            >
              Edit
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault()
                deleteEntry(entry.id)
              }}
              className="glass rounded-xl px-4 py-2 text-red-600 hover:bg-red-50/40 transition-all text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
