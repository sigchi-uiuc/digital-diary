"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { staggerContainer, listItem, sectionReveal } from "@/lib/animations"

interface FriendEntry {
  id: string
  type: "FREEWRITE" | "GUIDED"
  content: string | null
  qualityEmoji: string | null
  mediaUrls: string[]
  createdAt: Date | string
  user: {
    id: string
    username: string
    firstName: string | null
    lastName: string | null
    profilePicture: string | null
  }
}

interface Props {
  variant: "home" | "friends"
  initialEntries: FriendEntry[]
}

function displayName(user: FriendEntry["user"]) {
  const first = user.firstName?.trim()
  const last = user.lastName?.trim()
  if (first && last) return `${first} ${last}`
  if (first) return first
  if (last) return last
  return user.username
}

function initials(user: FriendEntry["user"]) {
  const first = user.firstName?.trim()
  const last = user.lastName?.trim()
  if (first && last) return `${first[0]}${last[0]}`.toUpperCase()
  if (first) return first[0].toUpperCase()
  if (last) return last[0].toUpperCase()
  return user.username[0]?.toUpperCase() || "U"
}

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function RecentFriendEntries({ variant, initialEntries }: Props) {
  const limit = variant === "home" ? 3 : 5
  const entries = initialEntries.slice(0, limit)

  return (
    <motion.div
      className={`panel-soft p-5 ${variant === "home" ? "mt-6" : ""}`}
      variants={sectionReveal}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#1a4d3e]">Recent Friend Entries</h2>
        {initialEntries.length > 0 && (
          <span className="text-xs text-[#1a4d3e]/60">{initialEntries.length} shared entries</span>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-[#1a4d3e]/70">No shared entries from friends yet.</p>
      ) : (
        <motion.div className="space-y-3" variants={staggerContainer} initial="hidden" animate="visible">
          {entries.map((entry) => (
            <motion.div key={entry.id} variants={listItem}>
            <Link
              href={`/friends/${entry.user.id}`}
              className="flex gap-3 rounded-2xl bg-white/50 p-3 hover:bg-white/70 transition-all"
            >
              <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#52C9A2] text-white text-xs font-semibold flex items-center justify-center overflow-hidden shrink-0">
                {entry.user.profilePicture ? (
                  <Image src={entry.user.profilePicture} alt={displayName(entry.user)} fill className="object-cover" />
                ) : (
                  <span>{initials(entry.user)}</span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-semibold text-[#1a4d3e] truncate">{displayName(entry.user)}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    entry.type === "FREEWRITE"
                      ? "bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white"
                      : "bg-gradient-to-r from-[#52C9A2] to-[#63D4B3] text-white"
                  }`}>
                    {entry.type === "FREEWRITE" ? "Freewrite" : "Guided"}
                  </span>
                  {entry.qualityEmoji && <span className="text-base leading-none">{entry.qualityEmoji}</span>}
                </div>
                <p className="text-xs text-[#1a4d3e]/80 line-clamp-2 mb-1">{entry.content || "No content"}</p>
                <span className="text-[11px] text-[#1a4d3e]/50">{formatDate(entry.createdAt)}</span>
              </div>
            </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
