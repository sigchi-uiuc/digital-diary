"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

interface UserCard {
  id: string
  username: string
  firstName: string | null
  lastName: string | null
  profilePicture: string | null
  isFriend?: boolean
}

function displayName(user: UserCard): string {
  const first = user.firstName?.trim()
  const last = user.lastName?.trim()

  if (first && last) return `${first} ${last}`
  if (first) return first
  if (last) return last
  return user.username
}

function initials(user: UserCard): string {
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
  const [loading, setLoading] = useState(false)
  const [loadingFriends, setLoadingFriends] = useState(false)
  const [addingUserId, setAddingUserId] = useState<string | null>(null)
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
    } catch (err: any) {
      setError(err?.message || "Failed to load friends")
      setFriends([])
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

  const addFriend = async (userId: string) => {
    setAddingUserId(userId)
    setError("")

    try {
      const response = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      const data = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(data?.error || "Failed to add friend")
      }

      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, isFriend: true } : user))
      )
      await fetchFriends()
    } catch (err: any) {
      setError(err?.message || "Failed to add friend")
    } finally {
      setAddingUserId(null)
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
              Search people to add as friends
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
                      {user.isFriend ? (
                        <span className="rounded-xl bg-[#52C9A2]/20 px-3 py-1.5 text-sm font-medium text-[#1a4d3e]">
                          My Friends
                        </span>
                      ) : (
                        <button
                          onClick={() => addFriend(user.id)}
                          disabled={addingUserId === user.id}
                          className="rounded-xl bg-[#4A90E2] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#3E82CC] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {addingUserId === user.id ? "Adding..." : "Add Friend"}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="panel-soft p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#1a4d3e]">Your Friends</h2>
              <span className="text-sm text-[#1a4d3e]/70">{friends.length}</span>
            </div>

            {loadingFriends ? (
              <div className="text-[#1a4d3e]/80">Loading friends...</div>
            ) : friends.length === 0 ? (
              <div className="text-[#1a4d3e]/80">You have no friends added yet.</div>
            ) : (
              <div className="space-y-3">
                {friends.map((friend) => (
                  <div key={friend.id} className="rounded-2xl bg-white/50 p-3 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#52C9A2] text-white font-semibold flex items-center justify-center overflow-hidden">
                      {friend.profilePicture ? (
                        <img
                          src={friend.profilePicture}
                          alt={displayName(friend)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{initials(friend)}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a4d3e]">{displayName(friend)}</p>
                      <p className="text-sm text-[#1a4d3e]/70">@{friend.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
