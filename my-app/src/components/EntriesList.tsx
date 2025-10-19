"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

interface Entry {
  id: string
  type: "FREEWRITE" | "GUIDED"
  content: string | null
  visibility: "PRIVATE" | "PUBLIC" | "PROTECTED"
  qualityScore: number | null
  qualityEmoji: string | null
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

  const getEntryTypeColor = (type: string) => {
    return type === "FREEWRITE" 
      ? "bg-blue-100 text-blue-800" 
      : "bg-green-100 text-green-800"
  }

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case "PUBLIC":
        return "bg-green-100 text-green-800"
      case "PROTECTED":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">{error}</p>
        <button
          onClick={fetchEntries}
          className="mt-2 text-red-600 hover:text-red-800 underline"
        >
          Try again
        </button>
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No entries yet</h3>
        <p className="text-gray-500 mb-4">Start your digital diary journey by creating your first entry.</p>
        <Link
          href="/entries/create/freewrite"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create Your First Entry
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEntryTypeColor(entry.type)}`}>
                  {entry.type === "FREEWRITE" ? "Freewrite" : "Guided"}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getVisibilityColor(entry.visibility)}`}>
                  {entry.visibility.toLowerCase()}
                </span>
                {entry.qualityEmoji && (
                  <span className="text-lg">{entry.qualityEmoji}</span>
                )}
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Entry from {formatDate(entry.createdAt)}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {entry.content || "No content"}
              </p>
              
              <div className="flex items-center text-xs text-gray-500">
                <span>Created: {formatDate(entry.createdAt)}</span>
                {entry.updatedAt !== entry.createdAt && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Updated: {formatDate(entry.updatedAt)}</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <Link
                href={`/entries/${entry.id}`}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View
              </Link>
              <Link
                href={`/entries/${entry.id}/edit`}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteEntry(entry.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
