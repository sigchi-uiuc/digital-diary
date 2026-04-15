import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getAppSession } from "@/lib/auth"
import { getEntries } from "@/lib/actions/entries"
import { getFriendEntries } from "@/lib/actions/friends"
import prisma from "@/lib/prisma"
import EntriesList from "@/components/EntriesList"
import CreateEntryDropdown from "@/components/CreateEntryDropdown"
import ProfileDropdown from "@/components/ProfileDropdown"
import CalendarEvents from "@/components/CalendarEvents"
import WeatherDisplay from "@/components/WeatherDisplay"
import DiaryCalendarPopup from "@/components/DiaryCalendar"
import RecentFriendEntries from "@/components/RecentFriendEntries"
import StatsBar from "@/components/StatsBar"
import AnimatedSection from "@/components/AnimatedSection"
import AnimatedNav from "@/components/AnimatedNav"
import { BookIcon } from "@/components/icons"

async function getUserStats(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      journalEntriesCount: true,
      publicEntriesCount: true,
      privateEntriesCount: true,
      protectedEntriesCount: true,
    },
  })
}

// Landing page for unauthenticated users (static, no JS needed)
function LandingPage() {
  return (
    <div className="min-h-screen relative z-10">
      <AnimatedNav className="glass-strong sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent">
              Digital Diary
            </h1>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin" className="glass rounded-2xl px-5 py-2.5 text-[#1a4d3e] hover:bg-white/40 transition-all font-medium text-sm">
                Sign In
              </Link>
              <Link href="/auth/signup" className="btn-glossy rounded-2xl px-5 py-2.5 text-white font-medium text-sm">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </AnimatedNav>

      <main className="max-w-4xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <AnimatedSection preset="hero">
            <div className="panel-soft p-12 text-center droplet">
              <div className="space-y-6">
                <div className="flex justify-center text-[#1a4d3e]">
                  <BookIcon className="w-16 h-16" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent">
                  Welcome to Digital Diary
                </h2>
                <p className="text-lg text-[#1a4d3e]/80 max-w-md mx-auto">
                  Capture your thoughts, experiences, and reflections in a beautiful digital space inspired by nature.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                  <Link href="/auth/signin" className="btn-glossy rounded-2xl px-8 py-3 text-white font-medium">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="glass rounded-2xl px-8 py-3 text-[#1a4d3e] hover:bg-white/40 transition-all font-medium border-2 border-white/50">
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </div>
  )
}

export default async function Home() {
  const session = await getAppSession()

  if (!session) {
    return <LandingPage />
  }

  // Fetch all data in parallel on the server
  const [entries, friendEntries, stats] = await Promise.all([
    getEntries(),
    getFriendEntries(),
    getUserStats(session.user.id),
  ])

  return (
    <div className="min-h-screen relative z-10">
      <AnimatedNav className="glass-strong sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent">
              Digital Diary
            </h1>
            <div className="flex items-center space-x-3">
              <WeatherDisplay />
              <Link href="/friends" className="glass rounded-2xl px-4 py-2 text-sm text-[#1a4d3e] hover:bg-white/40 transition-all font-medium">
                My Friends
              </Link>
              <ProfileDropdown user={session.user} />
            </div>
          </div>
        </div>
      </AnimatedNav>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-8">

          {/* Stats Bar */}
          <StatsBar stats={stats} />

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left column — entries */}
            <div className="lg:col-span-7">
              <AnimatedSection preset="fadeUp" delay={0.1}>
                <div className="mb-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent">
                        Your Journal
                      </h2>
                      <p className="mt-1 text-sm text-[#1a4d3e]/60">
                        {entries.length > 0
                          ? `${entries.length} entr${entries.length === 1 ? "y" : "ies"}`
                          : "Start documenting your journey"}
                      </p>
                    </div>
                    <CreateEntryDropdown />
                  </div>
                </div>
              </AnimatedSection>

              <EntriesList entries={entries} />
              <RecentFriendEntries variant="home" initialEntries={friendEntries} />
            </div>

            {/* Right column — calendar */}
            <div className="lg:col-span-5 space-y-8">
              <AnimatedSection preset="reveal" delay={0.2}>
                <Suspense fallback={<div className="panel-soft skeleton h-48 rounded-2xl" />}>
                  <CalendarEvents />
                </Suspense>
              </AnimatedSection>
              <AnimatedSection preset="reveal" delay={0.3}>
                <div className="panel-soft p-4">
                  <h3 className="text-lg font-semibold text-[#1a4d3e] mb-2">Diary Calendar</h3>
                  <DiaryCalendarPopup entries={entries} />
                </div>
              </AnimatedSection>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
