import Link from "next/link"
import { redirect } from "next/navigation"
import { getAppSession } from "@/lib/auth"
import { getOwnProfile } from "@/lib/actions/profile"
import AnimatedSection from "@/components/AnimatedSection"

function displayName(user: {
  username: string
  firstName: string | null
  lastName: string | null
}) {
  const first = user.firstName?.trim()
  const last = user.lastName?.trim()
  if (first && last) return `${first} ${last}`
  if (first) return first
  if (last) return last
  return user.username
}

function initials(user: {
  username: string
  firstName: string | null
  lastName: string | null
}) {
  const first = user.firstName?.trim()
  const last = user.lastName?.trim()
  if (first && last) return `${first[0]}${last[0]}`.toUpperCase()
  if (first) return first[0].toUpperCase()
  if (last) return last[0].toUpperCase()
  return user.username[0]?.toUpperCase() || "U"
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function previewContent(content: string | null) {
  if (!content?.trim()) return "No written content"
  return content.length > 180 ? `${content.slice(0, 177)}...` : content
}

function visibilityLabel(v: "PRIVATE" | "PUBLIC" | "PROTECTED") {
  if (v === "PRIVATE") return "private"
  if (v === "PUBLIC") return "public"
  return "friends"
}

export default async function OwnProfilePage() {
  const session = await getAppSession()
  if (!session) redirect("/auth/signin")

  const user = await getOwnProfile()

  return (
    <div className="min-h-screen relative z-10">
      <nav className="glass-strong sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center gap-4">
            <Link
              href="/"
              className="glass rounded-2xl px-4 py-2 text-sm font-medium text-[#1a4d3e] hover:bg-white/40 transition-all"
            >
              ← Digital Diary
            </Link>
            <Link
              href="/profile/edit"
              className="glass rounded-2xl px-4 py-2 text-sm font-medium text-[#4A90E2] hover:bg-white/40 transition-all"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 space-y-6">
          <AnimatedSection preset="reveal">
            <section className="panel-soft p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-[#4A90E2] to-[#52C9A2] text-white text-2xl font-semibold flex items-center justify-center overflow-hidden shrink-0">
                  {user.profilePicture ? (
                    <img src={user.profilePicture} alt={displayName(user)} className="w-full h-full object-cover" />
                  ) : (
                    <span>{initials(user)}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl font-bold text-[#1a4d3e]">{displayName(user)}</h1>
                  <p className="text-[#1a4d3e]/70 mt-1">@{user.username}</p>
                  <p className="text-sm text-[#1a4d3e]/60 mt-3">
                    Member since {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#1a4d3e]/50">Total Entries</p>
                  <p className="mt-2 text-2xl font-semibold text-[#1a4d3e]">{user.journalEntriesCount}</p>
                </div>
                <div className="rounded-2xl bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#1a4d3e]/50">Private</p>
                  <p className="mt-2 text-2xl font-semibold text-[#1a4d3e]">{user.privateEntriesCount}</p>
                </div>
                <div className="rounded-2xl bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#1a4d3e]/50">Shared</p>
                  <p className="mt-2 text-2xl font-semibold text-[#1a4d3e]">
                    {user.publicEntriesCount + user.protectedEntriesCount}
                  </p>
                </div>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection preset="reveal" delay={0.15}>
            <section className="panel-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-[#1a4d3e]">Recent Entries</h2>
                <span className="text-sm text-[#1a4d3e]/65">{user.entries.length}</span>
              </div>

              {user.entries.length === 0 ? (
                <p className="text-[#1a4d3e]/70">You haven&apos;t written any entries yet.</p>
              ) : (
                <div className="space-y-3">
                  {user.entries.map((entry) => (
                    <Link
                      key={entry.id}
                      href={`/entries/${entry.id}`}
                      className="block rounded-2xl bg-white/50 p-4 hover:bg-white/70 transition-all"
                    >
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            entry.type === "FREEWRITE"
                              ? "bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white"
                              : "bg-gradient-to-r from-[#52C9A2] to-[#63D4B3] text-white"
                          }`}
                        >
                          {entry.type === "FREEWRITE" ? "Freewrite" : "Guided"}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/70 text-[#1a4d3e]">
                          {visibilityLabel(entry.visibility)}
                        </span>
                        {entry.qualityEmoji && <span className="text-base leading-none">{entry.qualityEmoji}</span>}
                      </div>

                      <p className="text-sm text-[#1a4d3e] leading-6">{previewContent(entry.content)}</p>
                      <p className="mt-3 text-xs text-[#1a4d3e]/55">{formatDate(entry.createdAt)}</p>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </AnimatedSection>
        </div>
      </main>
    </div>
  )
}
