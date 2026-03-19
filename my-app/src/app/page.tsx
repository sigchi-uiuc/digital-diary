"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import EntriesList from "@/components/EntriesList"
import CreateEntryDropdown from "@/components/CreateEntryDropdown"
import ProfileDropdown from "@/components/ProfileDropdown"
import CalendarEvents from "@/components/CalendarEvents"
import WeatherDisplay from "@/components/WeatherDisplay"
import DiaryCalendarPopup from "@/components/DiaryCalendar"
import RecentFriendEntries from "@/components/RecentFriendEntries"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="glass-strong rounded-3xl px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#4A90E2] border-t-transparent"></div>
            <div className="text-lg font-medium text-[#1a4d3e]">Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen relative z-10">
        <nav className="glass-strong sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent">
                  Digital Diary
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="glass rounded-2xl px-5 py-2.5 text-[#1a4d3e] hover:bg-white/40 transition-all font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="btn-glossy rounded-2xl px-5 py-2.5 text-white font-medium text-sm"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto py-12 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="panel-soft p-12 text-center droplet">
              <div className="space-y-6">
                <div className="text-7xl mb-4">📔</div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent">
                  Welcome to Digital Diary
                </h2>
                <p className="text-lg text-[#1a4d3e]/80 max-w-md mx-auto">
                  Capture your thoughts, experiences, and reflections in a beautiful digital space inspired by nature.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                  <Link
                    href="/auth/signin"
                    className="btn-glossy rounded-2xl px-8 py-3 text-white font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="glass rounded-2xl px-8 py-3 text-[#1a4d3e] hover:bg-white/40 transition-all font-medium border-2 border-white/50"
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
    <div className="min-h-screen relative z-10">
      <nav className="glass-strong sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent">
               Digital Diary
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <WeatherDisplay />
              <Link
                href="/friends"
                className="glass rounded-2xl px-4 py-2 text-sm text-[#1a4d3e] hover:bg-white/40 transition-all font-medium"
              >
                My Friends
              </Link>
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent">
                      Your Journal Entries
                    </h2>
                    <p className="mt-2 text-sm text-[#1a4d3e]/70">
                      Document your thoughts, experiences, and reflections
                    </p>
                  </div>
                  <CreateEntryDropdown />
                </div>
              </div>
              <EntriesList />
              <RecentFriendEntries variant="home" />
            </div>

            <div className="space-y-8">
              <CalendarEvents />
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold text-[#1a4d3e] mb-2">Diary Calendar</h3>
                <DiaryCalendarPopup />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
