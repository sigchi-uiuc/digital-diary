import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { getAppSession } from "@/lib/auth"
import { getFriendProfile } from "@/lib/actions/friends"
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

export default async function FriendProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getAppSession()
  if (!session) redirect("/auth/signin")

  const { id } = await params
  const friend = await getFriendProfile(id)

  if (!friend) notFound()

  return (
    <div className="min-h-screen relative z-10">
      <nav className="glass-strong sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center gap-4">
            <Link
              href="/friends"
              className="glass rounded-2xl px-4 py-2 text-sm font-medium text-[#1a4d3e] hover:bg-white/40 transition-all"
            >
              Back to Friends
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
                {friend.profilePicture ? (
                  <img src={friend.profilePicture} alt={displayName(friend)} className="w-full h-full object-cover" />
                ) : (
                  <span>{initials(friend)}</span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="text-3xl font-bold text-[#1a4d3e]">{displayName(friend)}</h1>
                <p className="text-[#1a4d3e]/70 mt-1">@{friend.username}</p>
                <p className="text-sm text-[#1a4d3e]/60 mt-3">
                  Friends since at least {formatDate(friend.createdAt)}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/60 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#1a4d3e]/50">Shared Entries</p>
                <p className="mt-2 text-2xl font-semibold text-[#1a4d3e]">
                  {friend.publicEntriesCount + friend.protectedEntriesCount}
                </p>
                <p className="text-sm text-[#1a4d3e]/65">Entries shared with friends</p>
              </div>

              <div className="rounded-2xl bg-white/60 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#1a4d3e]/50">Recent Activity</p>
                <p className="mt-2 text-2xl font-semibold text-[#1a4d3e]">{friend.entries.length}</p>
                <p className="text-sm text-[#1a4d3e]/65">Entries shown on this page</p>
              </div>
            </div>
          </section>
          </AnimatedSection>

          <AnimatedSection preset="reveal" delay={0.15}>
          <section className="panel-soft p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-[#1a4d3e]">Recent Entries</h2>
              <span className="text-sm text-[#1a4d3e]/65">{friend.entries.length}</span>
            </div>

            {friend.entries.length === 0 ? (
              <p className="text-[#1a4d3e]/70">No visible entries from this friend yet.</p>
            ) : (
              <div className="space-y-3">
                {friend.entries.map((entry) => (
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
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#52C9A2]/20 text-[#1a4d3e]">
                        shared
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
