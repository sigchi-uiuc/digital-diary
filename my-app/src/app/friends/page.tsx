"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import RecentFriendEntries from "@/components/RecentFriendEntries"

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

export default function FriendsPage() {
  const { status } = useSession()
  const [query, setQuery] = useState("")
  const [users, setUsers] = useState<UserCard[]>([])
  const [friends, setFriends] = useState<UserCard[]>([])
  const [blockedFriends, setBlockedFriends] = useState<UserCard[]>([])
  const [sentRequests, setSentRequests] = useState<UserCard[]>([])
  const [receivedRequests, setReceivedRequests] = useState<UserCard[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingFriends, setLoadingFriends] = useState(false)
  const [sendingUserId, setSendingUserId] = useState<string | null>(null)
  const [relationshipActionUserId, setRelationshipActionUserId] = useState<string | null>(null)
  const [error, setError] = useState("")

  const trimmedQuery = useMemo(() => query.trim(), [query])

  const fetchFriends = useCallback(async () => {
    setLoadingFriends(true)
    try {
      const response = await fetch("/api/friends")
      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || "Failed to load friends")
      }
      const data = await response.json()
      setFriends(Array.isArray(data.friends) ? data.friends : [])
      setBlockedFriends(Array.isArray(data.blockedFriends) ? data.blockedFriends : [])
      setSentRequests(Array.isArray(data.sentRequests) ? data.sentRequests : [])
      setReceivedRequests(Array.isArray(data.receivedRequests) ? data.receivedRequests : [])
    } catch (err: any) {
      setError(err?.message || "Failed to load friends")
      setFriends([])
      setBlockedFriends([])
      setSentRequests([])
      setReceivedRequests([])
    } finally {
      setLoadingFriends(false)
    }
  }, [])

  useEffect(() => {
    if (status === "authenticated") {
      fetchFriends()
    }
  }, [status, fetchFriends])

  useEffect(() => {
    if (trimmedQuery.length < 2) {
      setUsers([])
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setLoading(true)
      setError("")

      try {
        const response = await fetch(
          `/api/users/search?q=${encodeURIComponent(trimmedQuery)}&take=20`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          const data = await response.json().catch(() => null)
          throw new Error(data?.error || "Failed to search users")
        }

        const data = await response.json()
        setUsers(Array.isArray(data.users) ? data.users : [])
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setError(err?.message || "Failed to search users")
          setUsers([])
        }
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [trimmedQuery])

  const sendFriendRequest = async (userId: string) => {
    setSendingUserId(userId)
    setError("")

    try {
      const response = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      const data = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(data?.error || "Failed to send friend request")
      }

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, relationshipStatus: "outgoing_request" } : user
        )
      )
      await fetchFriends()
    } catch (err: any) {
      setError(err?.message || "Failed to send friend request")
    } finally {
      setSendingUserId(null)
    }
  }

  const blockFriend = async (userId: string) => {
    setRelationshipActionUserId(userId)
    setError("")

    try {
      const response = await fetch("/api/blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      const data = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(data?.error || "Failed to block friend")
      }

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, relationshipStatus: "blocked" } : user
        )
      )
      await fetchFriends()
    } catch (err: any) {
      setError(err?.message || "Failed to block friend")
    } finally {
      setRelationshipActionUserId(null)
    }
  }

  const unblockFriend = async (userId: string) => {
    setRelationshipActionUserId(userId)
    setError("")

    try {
      const response = await fetch("/api/blocks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      const data = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(data?.error || "Failed to unblock friend")
      }

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, relationshipStatus: "friend" } : user
        )
      )
      await fetchFriends()
    } catch (err: any) {
      setError(err?.message || "Failed to unblock friend")
    } finally {
      setRelationshipActionUserId(null)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="glass-strong rounded-3xl px-8 py-6">
          <div className="text-[#1a4d3e] font-medium">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative z-10">
      <nav className="glass-strong sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="glass rounded-2xl px-4 py-2 text-sm text-[#1a4d3e] hover:bg-white/40 transition-all"
              >
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
        <div className="px-4 sm:px-0 space-y-6">
          <div className="panel-soft p-6">
            <label htmlFor="user-search" className="block text-sm font-medium text-[#1a4d3e] mb-2">
              Search people to send a friend request
            </label>
            <input
              id="user-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type at least 2 characters..."
              className="w-full rounded-xl border border-white/50 bg-white/70 px-4 py-3 text-[#1a4d3e] placeholder-[#1a4d3e]/50 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
            />
            <p className="mt-2 text-xs text-[#1a4d3e]/70">
              Results update while you type.
            </p>
          </div>

          {error && (
            <div className="glass-strong rounded-2xl p-4 border-2 border-red-200/60 text-red-700 text-sm">
              {error}
            </div>
          )}

          {trimmedQuery.length >= 2 && (
            <>
              {loading ? (
                <div className="panel-soft p-8 text-center text-[#1a4d3e]">Searching...</div>
              ) : users.length === 0 ? (
                <div className="panel-soft p-8 text-center text-[#1a4d3e]/80">
                  No users found.
                </div>
              ) : (
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="panel-soft p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#52C9A2] text-white font-semibold flex items-center justify-center overflow-hidden">
                          {user.profilePicture ? (
                            <img
                              src={user.profilePicture}
                              alt={displayName(user)}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{initials(user)}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1a4d3e]">{displayName(user)}</p>
                          <p className="text-sm text-[#1a4d3e]/70">@{user.username}</p>
                        </div>
                      </div>
                      {renderRelationshipAction(user.relationshipStatus, sendingUserId === user.id, () =>
                        sendFriendRequest(user.id)
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.6fr] gap-5 items-start">
            <div className="space-y-4 lg:max-w-sm">
              <div className="panel-soft p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-[#1a4d3e]">Requests I Received</h2>
                  <span className="text-xs text-[#1a4d3e]/70">{receivedRequests.length}</span>
                </div>

                {loadingFriends ? (
                  <div className="text-sm text-[#1a4d3e]/80">Loading requests...</div>
                ) : receivedRequests.length === 0 ? (
                  <div className="text-sm text-[#1a4d3e]/80">You have no incoming friend requests.</div>
                ) : (
                  <div className="space-y-2.5">
                    {receivedRequests.map((user) => (
                      <RelationshipCard key={user.id} user={user} badge="Request Received" compact />
                    ))}
                  </div>
                )}
              </div>

              <div className="panel-soft p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-[#1a4d3e]">Requests I Sent</h2>
                  <span className="text-xs text-[#1a4d3e]/70">{sentRequests.length}</span>
                </div>

                {loadingFriends ? (
                  <div className="text-sm text-[#1a4d3e]/80">Loading requests...</div>
                ) : sentRequests.length === 0 ? (
                  <div className="text-sm text-[#1a4d3e]/80">You have not sent any friend requests yet.</div>
                ) : (
                  <div className="space-y-2.5">
                    {sentRequests.map((user) => (
                      <RelationshipCard key={user.id} user={user} badge="Request Sent" compact />
                    ))}
                  </div>
                )}
              </div>

              <div className="panel-soft p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-[#1a4d3e]">Blocked</h2>
                  <span className="text-xs text-[#1a4d3e]/70">{blockedFriends.length}</span>
                </div>

                {loadingFriends ? (
                  <div className="text-sm text-[#1a4d3e]/80">Loading blocked users...</div>
                ) : blockedFriends.length === 0 ? (
                  <div className="text-sm text-[#1a4d3e]/80">No friends are blocked right now.</div>
                ) : (
                  <div className="space-y-2.5">
                    {blockedFriends.map((user) => (
                      <RelationshipCard
                        key={user.id}
                        user={user}
                        badge="Blocked"
                        compact
                        action={{
                          label: relationshipActionUserId === user.id ? "Unblocking..." : "Unblock",
                          onClick: () => unblockFriend(user.id),
                          tone: "soft",
                          disabled: relationshipActionUserId === user.id,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="panel-soft p-6 lg:p-7">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-[#1a4d3e]">My Friends</h2>
                  <span className="text-sm text-[#1a4d3e]/70">{friends.length}</span>
                </div>

                {loadingFriends ? (
                  <div className="text-[#1a4d3e]/80">Loading friends...</div>
                ) : friends.length === 0 ? (
                  <div className="text-[#1a4d3e]/80">You have no friends added yet.</div>
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

              <RecentFriendEntries />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function renderRelationshipAction(
  status: RelationshipStatus | undefined,
  isSending: boolean,
  onSend: () => void
) {
  if (status === "blocked") {
    return (
      <span className="rounded-xl bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700">
        Blocked
      </span>
    )
  }

  if (status === "friend") {
    return (
      <span className="rounded-xl bg-[#52C9A2]/20 px-3 py-1.5 text-sm font-medium text-[#1a4d3e]">
        My Friend
      </span>
    )
  }

  if (status === "outgoing_request") {
    return (
      <span className="rounded-xl bg-[#F5C26B]/25 px-3 py-1.5 text-sm font-medium text-[#7A4B00]">
        Request Sent
      </span>
    )
  }

  if (status === "incoming_request") {
    return (
      <span className="rounded-xl bg-[#4A90E2]/15 px-3 py-1.5 text-sm font-medium text-[#1a4d3e]">
        Request Received
      </span>
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

function RelationshipCard({
  user,
  badge,
  compact = false,
  action,
  href,
}: {
  user: UserCard
  badge?: string
  compact?: boolean
  action?: CardAction
  href?: string
}) {
  const content = (
    <>
      <div className="flex items-center gap-3 min-w-0">
        <div className={`${compact ? "w-9 h-9 text-xs" : "w-11 h-11 text-sm"} rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#52C9A2] text-white font-semibold flex items-center justify-center overflow-hidden shrink-0`}>
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={displayName(user)}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{initials(user)}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className={`${compact ? "text-sm" : "text-base"} font-semibold text-[#1a4d3e] truncate`}>{displayName(user)}</p>
          <p className={`${compact ? "text-xs" : "text-sm"} text-[#1a4d3e]/70 truncate`}>@{user.username}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {badge ? (
          <span className={`${compact ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-sm"} rounded-xl bg-white/70 font-medium text-[#1a4d3e]`}>
            {badge}
          </span>
        ) : null}
        {action ? (
          <button
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              action.onClick()
            }}
            disabled={action.disabled}
            className={getActionClassName(action.tone || "neutral", compact, Boolean(action.disabled))}
          >
            {action.label}
          </button>
        ) : null}
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`rounded-2xl bg-white/50 flex items-center justify-between gap-3 hover:bg-white/70 transition-all ${compact ? "p-2.5" : "p-3"}`}>
        {content}
      </Link>
    )
  }

  return (
    <div className={`rounded-2xl bg-white/50 flex items-center justify-between gap-3 ${compact ? "p-2.5" : "p-3"}`}>
      {content}
    </div>
  )
}

function getActionClassName(tone: ActionTone, compact: boolean, disabled: boolean) {
  const size = compact ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-sm"
  const disabledState = disabled ? " opacity-60 cursor-not-allowed" : ""

  if (tone === "danger") {
    return `rounded-xl bg-red-100 ${size} font-medium text-red-700 hover:bg-red-200 transition-all${disabledState}`
  }

  if (tone === "soft") {
    return `rounded-xl bg-[#4A90E2]/15 ${size} font-medium text-[#1a4d3e] hover:bg-[#4A90E2]/25 transition-all${disabledState}`
  }

  return `rounded-xl glass ${size} font-medium text-[#1a4d3e] hover:bg-white/40 transition-all${disabledState}`
}
