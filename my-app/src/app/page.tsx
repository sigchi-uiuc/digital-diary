import Link from "next/link"
import { getAppSession } from "@/lib/auth"
import { getEntries } from "@/lib/actions/entries"
import { getFriendEntries } from "@/lib/actions/friends"
import prisma from "@/lib/prisma"
import EntriesList from "@/components/EntriesList"
import CreateEntryDropdown from "@/components/CreateEntryDropdown"
import ProfileDropdown from "@/components/ProfileDropdown"
import WeatherDisplay from "@/components/WeatherDisplay"
import DiaryCalendar from "@/components/DiaryCalendar"
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
  const features = [
    {
      title: "Freewrite & Guided Entries",
      body: "Dump your thoughts freely or answer gentle AI-guided prompts that help you reflect more deeply.",
    },
    {
      title: "Voice, Photos & Places",
      body: "Record voice notes, attach photos and videos, and pin the places tied to each memory.",
    },
    {
      title: "Mood Tracking",
      body: "Tag entries with a mood emoji. Watch your emotional rhythm unfold on the calendar over time.",
    },
    {
      title: "Share With Friends",
      body: "Keep entries private by default, or share selected ones with trusted friends, nobody else.",
    },
    {
      title: "Gesture Control",
      body: "Flip pages and capture moments hands-free with hand- and face-gesture recognition.",
    },
    {
      title: "Yours, Always",
      body: "Your entries are yours. Private by default, encrypted in transit, never sold, never trained on.",
    },
  ]

  const steps = [
    { n: "1", title: "Sign in", body: "Create an account in seconds with Google or email." },
    { n: "2", title: "Write freely", body: "Start a freewrite entry or pick a guided prompt to kick off a reflection." },
    { n: "3", title: "Look back", body: "Browse entries by date, mood, or place, and share moments with friends." },
  ]

  return (
    <div className="min-h-screen relative z-10">
      <AnimatedNav className="glass-strong sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <BookIcon className="w-7 h-7 text-[#1a4d3e]" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent">
                Digital Diary
              </h1>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link href="/auth/signin" className="glass rounded-2xl px-4 sm:px-5 py-2.5 text-[#1a4d3e] hover:bg-white/40 transition-all font-medium text-sm">
                Sign In
              </Link>
              <Link href="/auth/signup" className="btn-glossy rounded-2xl px-4 sm:px-5 py-2.5 text-white font-medium text-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </AnimatedNav>

      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16">
          <AnimatedSection preset="hero">
            <div className="panel-soft p-8 sm:p-14 text-center droplet">
              <div className="space-y-6 max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-[#1a4d3e]/80 tracking-wide uppercase">
                  A journal for your actual life
                </span>
                <h2 className="text-4xl sm:text-6xl font-bold leading-tight bg-gradient-to-r from-[#1a4d3e] via-[#2f7a63] to-[#4A90E2] bg-clip-text text-transparent">
                  Your days, reflected back to you.
                </h2>
                <p className="text-lg sm:text-xl text-[#1a4d3e]/80">
                  Digital Diary is a calm, private space to write, record, and remember, with gentle AI prompts,
                  mood tracking, and shareable moments for the few people you trust.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <Link href="/auth/signup" className="btn-glossy rounded-2xl px-8 py-3 text-white font-semibold w-full sm:w-auto text-center">
                    Start your diary, it&apos;s free
                  </Link>
                  <Link href="/auth/signin" className="glass rounded-2xl px-8 py-3 text-[#1a4d3e] hover:bg-white/40 transition-all font-medium border-2 border-white/50 w-full sm:w-auto text-center">
                    I already have an account
                  </Link>
                </div>
                <p className="text-xs text-[#1a4d3e]/55 pt-1">Private by default. No ads. No selling your data.</p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <AnimatedSection preset="reveal">
            <div className="text-center mb-10">
              <h3 className="text-3xl sm:text-4xl font-bold text-[#1a4d3e]">Everything you need, nothing you don&apos;t.</h3>
              <p className="mt-3 text-[#1a4d3e]/70 max-w-2xl mx-auto">
                Built around the way people actually journal: messy, multimedia, occasionally shared.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} preset="fadeUp" delay={0.05 * i}>
                <div className="panel-soft p-6 h-full">
                  <h4 className="text-lg font-semibold text-[#1a4d3e]">{f.title}</h4>
                  <p className="mt-2 text-sm text-[#1a4d3e]/75 leading-6">{f.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <AnimatedSection preset="reveal">
            <div className="panel-soft p-8 sm:p-12">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-[#1a4d3e]">How it works</h3>
                <p className="mt-2 text-[#1a4d3e]/70">Three steps. That&apos;s it.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {steps.map((s) => (
                  <div key={s.n} className="rounded-2xl bg-white/50 p-5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#52C9A2] text-white font-semibold flex items-center justify-center mb-3">
                      {s.n}
                    </div>
                    <h4 className="font-semibold text-[#1a4d3e]">{s.title}</h4>
                    <p className="mt-1.5 text-sm text-[#1a4d3e]/75">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <AnimatedSection preset="hero">
            <div className="panel-soft p-10 sm:p-14 text-center">
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent">
                Write the first page tonight.
              </h3>
              <p className="mt-4 text-[#1a4d3e]/75 max-w-xl mx-auto">
                You don&apos;t need the perfect sentence. Just show up. Your future self will thank you.
              </p>
              <div className="mt-8">
                <Link href="/auth/signup" className="btn-glossy rounded-2xl px-8 py-3 text-white font-semibold inline-block">
                  Create your diary
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </section>

        <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-center text-xs text-[#1a4d3e]/55">
          <p>© {new Date().getFullYear()} Digital Diary. A quieter place on the internet.</p>
        </footer>
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
                <div className="panel-soft p-4">
                  <DiaryCalendar entries={entries} />
                </div>
              </AnimatedSection>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
