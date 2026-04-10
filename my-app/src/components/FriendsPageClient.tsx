"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { staggerContainer, cardVariant, fadeUp, sectionReveal, listItem } from "@/lib/animations"
import RecentFriendEntries from "@/components/RecentFriendEntries"
import { sendFriendRequest, acceptFriendRequest, searchUsers, getFriendEntries, blockUser, unblockUser } from "@/lib/actions/friends"

type RelationshipStatus = "none" | "friend" | "outgoing_request" | "incoming_request" | "blocked"
type ActionTone = "neutral" | "danger" | "soft"

interface UserCard {
  id: string
  username: string
  firstName: string | null
  lastName: string | null
  profilePicture: string | null
  relationshipStatus?: RelationshipStatus
}

interface CardAction {
  label: string
  onClick: () => void
  tone?: ActionTone
  disabled?: boolean
}

interface FriendsData {
  friends: UserCard[]
  blockedFriends: UserCard[]
  sentRequests: UserCard[]
  receivedRequests: UserCard[]
}

interface FriendEntry {
  id: string
  type: "FREEWRITE" | "GUIDED"
  content: string | null
  qualityEmoji: string | null
  mediaUrls: string[]
  createdAt: Date
  user: {
    id: string
    username: string
    firstName: string | null
    lastName: string | null
    profilePicture: string | null
  }
}

interface Props {
  initialData: FriendsData
  initialFriendEntries: FriendEntry[]
}

function displayName(user: UserCard) {
  const first = user.firstName?.trim()
  const last = user.lastName?.trim()
  if (first && last) return `${first} ${last}`
  if (first) return first
  if (last) return last
  return user.username
}

function initials(user: UserCard) {
  const first = user.firstName?.trim()
  const last = user.lastName?.trim()
  if (first && last) return `${first[0]}${last[0]}`.toUpperCase()
  if (first) return first[0].toUpperCase()
  if (last) return last[0].toUpperCase()
  return user.username[0]?.toUpperCase() || "U"
}

export default function FriendsPageClient({ initialData, initialFriendEntries }: Props) {
  const [query, setQuery] = useState("")
  const [users, setUsers] = useState<UserCard[]>([])
  const [friends, setFriends] = useState(initialData.friends)
  const [blockedFriends, setBlockedFriends] = useState(initialData.blockedFriends)
  const [sentRequests, setSentRequests] = useState(initialData.sentRequests)
  const [receivedRequests, setReceivedRequests] = useState(initialData.receivedRequests)
  const [friendEntries, setFriendEntries] = useState(initialFriendEntries)
  const [searching, setSearching] = useState(false)
  const [sendingUserId, setSendingUserId] = useState<string | null>(null)
  const [relationshipActionUserId, setRelationshipActionUserId] = useState<string | null>(null)
  const [error, setError] = useState("")

  const trimmedQuery = useMemo(() => query.trim(), [query])

  const refreshFriends = useCallback(async () => {
    try {
      const { getFriends } = await import("@/lib/actions/friends")
      const data = await getFriends()
      setFriends(data.friends)
      setBlockedFriends(data.blockedFriends)
      setSentRequests(data.sentRequests)
      setReceivedRequests(data.receivedRequests)

      const entries = await getFriendEntries()
      setFriendEntries(entries)
    } catch {
      // Non-critical refresh failure
    }
  }, [])

  useEffect(() => {
    if (trimmedQuery.length < 2) {
      setUsers([])
      return
    }

    const timer = setTimeout(async () => {
      setSearching(true)
      setError("")
      try {
        const result = await searchUsers(trimmedQuery)
        setUsers(Array.isArray(result.users) ? result.users : [])
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to search users"
        setError(msg)
        setUsers([])
      } finally {
        setSearching(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [trimmedQuery])

  const handleSendFriendRequest = async (userId: string) => {
    setSendingUserId(userId)
    setError("")
    try {
      await sendFriendRequest(userId)
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, relationshipStatus: "outgoing_request" } : u))
      )
      await refreshFriends()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send friend request")
    } finally {
      setSendingUserId(null)
    }
  }

  const handleAcceptFriendRequest = async (userId: string) => {
    setRelationshipActionUserId(userId)
    setError("")
    try {
      await acceptFriendRequest(userId)
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, relationshipStatus: "friend" } : u)))
      await refreshFriends()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to accept friend request")
    } finally {
      setRelationshipActionUserId(null)
    }
  }

  const blockFriend = async (userId: string) => {
    setRelationshipActionUserId(userId)
    setError("")
    try {
      await blockUser(userId)
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, relationshipStatus: "blocked" } : u)))
      await refreshFriends()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to block friend")
    } finally {
      setRelationshipActionUserId(null)
    }
  }

  const unblockFriend = async (userId: string) => {
    setRelationshipActionUserId(userId)
    setError("")
    try {
      await unblockUser(userId)
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, relationshipStatus: "friend" } : u)))
      await refreshFriends()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to unblock friend")
    } finally {
      setRelationshipActionUserId(null)
    }
  }

  return (
    <div className="min-h-screen relative z-10">
      <nav className="glass-strong sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4">
              <Link href="/" className="glass rounded-2xl px-4 py-2 text-sm text-[#1a4d3e] hover:bg-white/40 transition-all">
                Back
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent">
                My Friends
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-8 sm:px-6 lg:px-8">
        <motion.div
          className="px-4 sm:px-0 space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="panel-soft p-6" variants={cardVariant}>
            <label htmlFor="user-search" className="block text-sm font-medium text-[#1a4d3e] mb-2">
              Search people to send a friend request
            </label>
            <input
              id="user-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type at least 2 characters..."
              className="input-glass w-full px-4 py-3 focus:ring-2 focus:ring-[#4A90E2]"
            />
            <p className="mt-2 text-xs text-[#1a4d3e]/70">Results update while you type.</p>
          </motion.div>

          {error && (
            <div className="glass-strong rounded-2xl p-4 border-2 border-red-200/60 text-red-700 text-sm">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
          {trimmedQuery.length >= 2 && (
            <>
              {searching ? (
                <motion.div key="searching" className="panel-soft p-8 text-center text-[#1a4d3e]" variants={fadeUp} initial="hidden" animate="visible" exit="hidden">Searching...</motion.div>
              ) : users.length === 0 ? (
                <motion.div key="no-results" className="panel-soft p-8 text-center text-[#1a4d3e]/80" variants={fadeUp} initial="hidden" animate="visible" exit="hidden">No users found.</motion.div>
              ) : (
                <motion.div key="results" className="space-y-3" variants={staggerContainer} initial="hidden" animate="visible" exit="hidden">
                  {users.map((user) => (
                    <motion.div key={user.id} className="panel-soft p-4 flex items-center justify-between" variants={listItem}>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#52C9A2] text-white font-semibold flex items-center justify-center overflow-hidden">
                          {user.profilePicture ? (
                            <Image src={user.profilePicture} alt={displayName(user)} fill className="object-cover" />
                          ) : (
                            <span>{initials(user)}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1a4d3e]">{displayName(user)}</p>
                          <p className="text-sm text-[#1a4d3e]/70">@{user.username}</p>
                        </div>
                      </div>
                      {renderRelationshipAction(
                        user.relationshipStatus,
                        sendingUserId === user.id,
                        () => handleSendFriendRequest(user.id),
                        relationshipActionUserId === user.id,
                        () => handleAcceptFriendRequest(user.id)
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
          </AnimatePresence>

          <motion.div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.6fr] gap-5 items-start" variants={cardVariant}>
            <div className="space-y-4 lg:max-w-sm">
              <RequestsPanel title="Requests I Received" count={receivedRequests.length}>
                {receivedRequests.length === 0 ? (
                  <p className="text-sm text-[#1a4d3e]/70">No incoming friend requests.</p>
                ) : (
                  receivedRequests.map((u) => (
                    <RelationshipCard
                      key={u.id}
                      user={u}
                      compact
                      action={{
                        label: relationshipActionUserId === u.id ? "Accepting..." : "Accept",
                        onClick: () => handleAcceptFriendRequest(u.id),
                        tone: "soft",
                        disabled: relationshipActionUserId === u.id,
                      }}
                    />
                  ))
                )}
              </RequestsPanel>

              <RequestsPanel title="Requests I Sent" count={sentRequests.length}>
                {sentRequests.length === 0 ? (
                  <p className="text-sm text-[#1a4d3e]/70">No sent friend requests.</p>
                ) : (
                  sentRequests.map((u) => <RelationshipCard key={u.id} user={u} badge="Request Sent" compact />)
                )}
              </RequestsPanel>

              <RequestsPanel title="Blocked" count={blockedFriends.length}>
                {blockedFriends.length === 0 ? (
                  <p className="text-sm text-[#1a4d3e]/70">No friends blocked.</p>
                ) : (
                  blockedFriends.map((u) => (
                    <RelationshipCard
                      key={u.id}
                      user={u}
                      compact
                      action={{
                        label: relationshipActionUserId === u.id ? "Unblocking..." : "Unblock",
                        onClick: () => unblockFriend(u.id),
                        tone: "soft",
                        disabled: relationshipActionUserId === u.id,
                      }}
                    />
                  ))
                )}
              </RequestsPanel>
            </div>

            <div className="space-y-6">
              <div className="panel-soft p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-[#1a4d3e]">My Friends</h2>
                  <span className="text-sm text-[#1a4d3e]/70">{friends.length}</span>
                </div>
                {friends.length === 0 ? (
                  <p className="text-[#1a4d3e]/70">You have no friends added yet.</p>
                ) : (
                  <div className="space-y-3">
                    {friends.map((friend) => (
                      <RelationshipCard
                        key={friend.id}
                        user={friend}
                        href={`/friends/${friend.id}`}
                        action={{
                          label: relationshipActionUserId === friend.id ? "Blocking..." : "Block",
                          onClick: () => blockFriend(friend.id),
                          tone: "danger",
                          disabled: relationshipActionUserId === friend.id,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <RecentFriendEntries variant="friends" initialEntries={friendEntries} />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

function RequestsPanel({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div className="panel-soft p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#1a4d3e]">{title}</h2>
        <span className="text-xs text-[#1a4d3e]/70">{count}</span>
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  )
}

function renderRelationshipAction(
  status: RelationshipStatus | undefined,
  isSending: boolean,
  onSend: () => void,
  isAccepting = false,
  onAccept?: () => void
) {
  if (status === "blocked") return <span className="rounded-xl bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700">Blocked</span>
  if (status === "friend") return <span className="rounded-xl bg-[#52C9A2]/20 px-3 py-1.5 text-sm font-medium text-[#1a4d3e]">My Friend</span>
  if (status === "outgoing_request") return <span className="rounded-xl bg-[#F5C26B]/25 px-3 py-1.5 text-sm font-medium text-[#7A4B00]">Request Sent</span>
  if (status === "incoming_request" && onAccept) {
    return (
      <button
        onClick={onAccept}
        disabled={isAccepting}
        className="rounded-xl bg-[#52C9A2] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#45b892] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isAccepting ? "Accepting..." : "Accept"}
      </button>
    )
  }

  return (
    <button
      onClick={onSend}
      disabled={isSending}
      className="rounded-xl bg-[#4A90E2] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#3E82CC] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isSending ? "Sending..." : "Send Request"}
    </button>
  )
}

function RelationshipCard({ user, badge, compact = false, action, href }: {
  user: UserCard; badge?: string; compact?: boolean; action?: CardAction; href?: string
}) {
  const content = (
    <>
      <div className="flex items-center gap-3 min-w-0">
        <div className={`relative ${compact ? "w-9 h-9 text-xs" : "w-11 h-11 text-sm"} rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#52C9A2] text-white font-semibold flex items-center justify-center overflow-hidden shrink-0`}>
          {user.profilePicture ? (
            <Image src={user.profilePicture} alt={displayName(user)} fill className="object-cover" />
          ) : <span>{initials(user)}</span>}
        </div>
        <div className="min-w-0">
          <p className={`${compact ? "text-sm" : "text-base"} font-semibold text-[#1a4d3e] truncate`}>{displayName(user)}</p>
          <p className={`${compact ? "text-xs" : "text-sm"} text-[#1a4d3e]/70 truncate`}>@{user.username}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {badge && <span className={`${compact ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-sm"} rounded-xl bg-white/70 font-medium text-[#1a4d3e]`}>{badge}</span>}
        {action && (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); action.onClick() }}
            disabled={action.disabled}
            className={getActionClassName(action.tone || "neutral", compact, Boolean(action.disabled))}
          >
            {action.label}
          </button>
        )}
      </div>
    </>
  )

  if (href) {
    return <Link href={href} className={`rounded-2xl bg-white/50 flex items-center justify-between gap-3 hover:bg-white/70 transition-all ${compact ? "p-2.5" : "p-3"}`}>{content}</Link>
  }
  return <div className={`rounded-2xl bg-white/50 flex items-center justify-between gap-3 ${compact ? "p-2.5" : "p-3"}`}>{content}</div>
}

function getActionClassName(tone: ActionTone, compact: boolean, disabled: boolean) {
  const size = compact ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-sm"
  const d = disabled ? " opacity-60 cursor-not-allowed" : ""
  if (tone === "danger") return `rounded-xl bg-red-100 ${size} font-medium text-red-700 hover:bg-red-200 transition-all${d}`
  if (tone === "soft") return `rounded-xl bg-[#4A90E2]/15 ${size} font-medium text-[#1a4d3e] hover:bg-[#4A90E2]/25 transition-all${d}`
  return `rounded-xl glass ${size} font-medium text-[#1a4d3e] hover:bg-white/40 transition-all${d}`
}
