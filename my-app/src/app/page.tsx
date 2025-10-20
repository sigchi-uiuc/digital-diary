"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import EntriesList from "@/components/EntriesList"
import CreateEntryDropdown from "@/components/CreateEntryDropdown"
import ProfileDropdown from "@/components/ProfileDropdown"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Digital Diary
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome to Digital Diary
                </h2>
                <p className="text-gray-600">
                  Please sign in to access your personal diary and start documenting your thoughts.
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                  <Link
                    href="/auth/signin"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-md text-sm font-medium border border-gray-300"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
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
              <h1 className="text-xl font-semibold text-gray-900">
                Digital Diary
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header with create button */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Journal Entries</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Document your thoughts, experiences, and reflections
                </p>
              </div>
              <CreateEntryDropdown />
            </div>
          </div>

          {/* Entries List */}
          <EntriesList />
        </div>
      </main>
    </div>
  )
}
