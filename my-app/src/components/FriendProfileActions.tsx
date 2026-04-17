"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { blockUser, removeFriend } from "@/lib/actions/friends"

interface Props {
  friendId: string
}

export default function FriendProfileActions({ friendId }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [action, setAction] = useState<"unfriend" | "block" | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handle = async (kind: "unfriend" | "block") => {
    const confirmMsg =
      kind === "unfriend"
        ? "Remove this friend? You can always send a new friend request later."
        : "Block this user? They'll no longer be able to see your profile or entries."
    if (typeof window !== "undefined" && !window.confirm(confirmMsg)) return

    setAction(kind)
    setError(null)
    startTransition(async () => {
      try {
        if (kind === "unfriend") await removeFriend(friendId)
        else await blockUser(friendId)
        router.push("/friends")
        router.refresh()
      } catch (e) {
        setError(e instanceof Error ? e.message : "Action failed")
        setAction(null)
      }
    })
  }

  return (
    <div className="mt-5 flex gap-2 flex-wrap">
      <button
        type="button"
        onClick={() => handle("unfriend")}
        disabled={pending}
        className="rounded-xl bg-[#4A90E2]/15 px-3 py-1.5 text-sm font-medium text-[#1a4d3e] hover:bg-[#4A90E2]/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending && action === "unfriend" ? "Removing..." : "Unfriend"}
      </button>
      <button
        type="button"
        onClick={() => handle("block")}
        disabled={pending}
        className="rounded-xl bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending && action === "block" ? "Blocking..." : "Block"}
      </button>
      {error && <span className="text-xs text-red-700 self-center">{error}</span>}
    </div>
  )
}
