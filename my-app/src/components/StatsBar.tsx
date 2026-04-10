"use client"

import { motion } from "framer-motion"
import { staggerContainer, cardVariant } from "@/lib/animations"
import { DocumentIcon, UsersIcon, LockIcon } from "@/components/icons"

interface Stats {
  journalEntriesCount: number
  publicEntriesCount: number
  protectedEntriesCount: number
  privateEntriesCount: number
}

export default function StatsBar({ stats }: { stats: Stats | null }) {
  const sharedCount = (stats?.publicEntriesCount ?? 0) + (stats?.protectedEntriesCount ?? 0)

  const statConfig = [
    {
      label: "Total Entries",
      value: stats?.journalEntriesCount ?? 0,
      Icon: DocumentIcon,
      gradient: "from-[#4A90E2] to-[#5BA3F5]",
      iconColor: "text-[#4A90E2]",
    },
    {
      label: "Shared",
      value: sharedCount,
      Icon: UsersIcon,
      gradient: "from-[#52C9A2] to-[#63D4B3]",
      iconColor: "text-[#52C9A2]",
    },
    {
      label: "Private",
      value: stats?.privateEntriesCount ?? 0,
      Icon: LockIcon,
      gradient: "from-[#B8C6DB] to-[#C8D6E5]",
      iconColor: "text-[#8A9BB5]",
    },
  ]

  return (
    <motion.div
      className="grid grid-cols-3 gap-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {statConfig.map(({ label, value, Icon, gradient, iconColor }) => (
        <motion.div key={label} variants={cardVariant} className="panel-soft p-5 text-center">
          <div className={`flex justify-center mb-2 ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {value}
          </div>
          <div className="text-xs text-[#1a4d3e]/60 mt-1 font-medium">{label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}
