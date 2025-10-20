"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

interface Entry {
  id: string
  type: "FREEWRITE" | "GUIDED"
  content: string | null
  visibility: "PRIVATE" | "PUBLIC" | "PROTECTED"
  qualityEmoji: string | null
  createdAt: string
  updatedAt: string
}

export default function ViewEntry() {
  const params = useParams()
  const router = useRouter()
  const [entry, setEntry] = useState<Entry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (params.id) {
      fetchEntry(params.id as string)
    }
  }, [params.id])

  const fetchEntry = async (entryId: string) => {
    try {
      const response = await fetch(`/api/entries/${entryId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch entry")
      }
      const data = await response.json()
      setEntry(data)
    } catch (error) {
      setError("Failed to load entry")
      console.error("Error fetching entry:", error)
    } finally {
      setLoading(false)
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error || !entry) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-indigo-600">
                  ← Digital Diary
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Entry Not Found</h2>
              <p className="text-gray-600 mb-4">{error || "This entry doesn't exist or you don't have permission to view it."}</p>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Back to Entries
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-indigo-600">
                ← Digital Diary
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href={`/entries/${entry.id}/edit`}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
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
              <h1 className="text-2xl font-bold text-gray-900">
                Entry from {formatDate(entry.createdAt)}
              </h1>
              <div className="mt-2 text-sm text-gray-500">
                <span>Created: {formatDate(entry.createdAt)}</span>
                {entry.updatedAt !== entry.createdAt && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Updated: {formatDate(entry.updatedAt)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              {entry.content ? (
                <div className="prose prose-gray max-w-none">
                  {entry.type === "GUIDED" ? (
                    <div className="whitespace-pre-wrap">{entry.content}</div>
                  ) : (
                    <p className="whitespace-pre-wrap">{entry.content}</p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📝</div>
                  <p>No content available for this entry.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
