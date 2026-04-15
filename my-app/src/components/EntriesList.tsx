"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { staggerContainer, cardVariant, emptyState } from "@/lib/animations"
import { PenIcon, PlayIcon } from "@/components/icons"
import EntryDeleteButton from "@/components/EntryDeleteButton"

interface Entry {
  id: string
  type: "FREEWRITE" | "GUIDED"
  content: string | null
  visibility: "PRIVATE" | "PUBLIC" | "PROTECTED"
  qualityEmoji: string | null
  mediaUrls: string[]
  createdAt: Date
  updatedAt: Date
}

interface Props {
  entries: Entry[]
}

const stripMarkdown = (text: string): string => {
  return text
    .replace(/^#{1,6}\s+/gm, "")       // headings
    .replace(/\*\*(.+?)\*\*/g, "$1")    // bold
    .replace(/\*(.+?)\*/g, "$1")        // italic
    .replace(/~~(.+?)~~/g, "$1")        // strikethrough
    .replace(/`(.+?)`/g, "$1")          // inline code
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // links
    .replace(/!\[.*?\]\(.+?\)/g, "")    // images
    .replace(/^>\s+/gm, "")             // blockquotes
    .replace(/^[-*+]\s+/gm, "")         // unordered lists
    .replace(/^\d+\.\s+/gm, "")         // ordered lists
    .replace(/\n{2,}/g, " ")            // multiple newlines
    .trim()
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function relativeTime(d: Date) {
  const now = Date.now()
  const diff = now - new Date(d).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days} days ago`
  return formatDate(d)
}

function wordCount(content: string | null) {
  if (!content) return 0
  return content.trim().split(/\s+/).filter(Boolean).length
}

export default function EntriesList({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-16">
        <motion.div
          className="panel-soft p-12 max-w-md mx-auto"
          variants={emptyState}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex justify-center text-[#1a4d3e]/60 mb-6"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <PenIcon className="w-14 h-14" />
          </motion.div>
          <h3 className="text-2xl font-bold text-[#1a4d3e] mb-3">No entries yet</h3>
          <p className="text-[#1a4d3e]/70 mb-8">
            Start your digital diary journey by creating your first entry.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/entries/create/freewrite"
              className="btn-glossy rounded-2xl px-5 py-2.5 text-white font-medium text-sm"
            >
              Freewrite
            </Link>
            <Link
              href="/entries/create/guided"
              className="btn-glossy-green rounded-2xl px-5 py-2.5 text-white font-medium text-sm"
            >
              Guided
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-5"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {entries.map((entry) => (
        <motion.div
          key={entry.id}
          variants={cardVariant}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="panel-soft transition-all duration-300 droplet">
            <Link href={`/entries/${entry.id}`} className="block p-6">
              <div className="flex items-center space-x-3 mb-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  entry.type === "FREEWRITE"
                    ? "bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white shadow-lg"
                    : "bg-gradient-to-r from-[#52C9A2] to-[#63D4B3] text-white shadow-lg"
                }`}>
                  {entry.type === "FREEWRITE" ? "Freewrite" : "Guided"}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  entry.visibility === "PRIVATE"
                    ? "glass text-[#1a4d3e]"
                    : "bg-gradient-to-r from-[#52C9A2] to-[#63D4B3] text-white"
                }`}>
                  {entry.visibility === "PRIVATE" ? "private" : "shared"}
                </span>
                {entry.qualityEmoji && <span className="text-2xl">{entry.qualityEmoji}</span>}
              </div>

              <div className="mb-1">
                <span className="text-xs font-semibold text-[#4A90E2]">{relativeTime(entry.createdAt)}</span>
              </div>
              <h3 className="text-base font-semibold text-[#1a4d3e]/70 mb-3 text-sm">
                {formatDate(entry.createdAt)}
              </h3>

              <p className="text-[#1a4d3e]/80 text-sm mb-4 line-clamp-3">
                {entry.content ? stripMarkdown(entry.content) : "No content"}
              </p>

              {entry.mediaUrls && entry.mediaUrls.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {entry.mediaUrls.slice(0, 3).map((url, index) => {
                    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
                    return isImage ? (
                      <Image
                        key={index}
                        src={url}
                        alt={`Preview ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded-lg border border-[#1a4d3e]/20"
                      />
                    ) : (
                      <div key={index} className="w-16 h-16 bg-[#1a4d3e]/10 rounded-lg border border-[#1a4d3e]/20 flex items-center justify-center">
                        <PlayIcon className="w-4 h-4 text-[#1a4d3e]/50" />
                      </div>
                    )
                  })}
                  {entry.mediaUrls.length > 3 && (
                    <div className="w-16 h-16 bg-[#1a4d3e]/10 rounded-lg border border-[#1a4d3e]/20 flex items-center justify-center">
                      <span className="text-xs text-[#1a4d3e]/70">+{entry.mediaUrls.length - 3}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center text-xs text-[#1a4d3e]/50 gap-2">
                <span>{wordCount(entry.content)} words</span>
                {new Date(entry.updatedAt).getTime() !== new Date(entry.createdAt).getTime() && (
                  <>
                    <span>-</span>
                    <span>Edited {relativeTime(entry.updatedAt)}</span>
                  </>
                )}
              </div>
            </Link>

            <div className="px-6 pb-6 flex items-center justify-end space-x-3">
              <Link
                href={`/entries/${entry.id}/edit`}
                className="glass rounded-xl px-4 py-2 text-[#1a4d3e] hover:bg-white/40 transition-all text-sm font-medium"
              >
                Edit
              </Link>
              <EntryDeleteButton entryId={entry.id} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
