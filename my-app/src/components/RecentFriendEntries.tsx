"use client"

interface RecentFriendEntriesProps {
  variant?: "home" | "friends"
}

export default function RecentFriendEntries({ variant = "home" }: RecentFriendEntriesProps) {
  return (
    <div className={`mt-8 ${variant === "friends" ? "panel-soft p-6" : ""}`}>
      <h3 className="text-xl font-bold bg-gradient-to-r from-[#1a4d3e] to-[#4A90E2] bg-clip-text text-transparent mb-4">
        Recent Friend Activity
      </h3>
      <div className="panel-soft p-6 text-center text-[#1a4d3e]/60 italic">
        Friend activity functionality is coming soon!
      </div>
    </div>
  )
}
