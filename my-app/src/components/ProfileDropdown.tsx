"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { dropdownVariants } from "@/lib/animations"

interface User {
  firstName?: string | null
  lastName?: string | null
  username?: string | null
  email?: string | null
  profilePicture?: string | null
}

interface Props {
  user: User
}

export default function ProfileDropdown({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const getDisplayName = () => {
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`
    if (user.firstName) return user.firstName
    if (user.lastName) return user.lastName
    return user.username || "User"
  }

  const getInitials = () => {
    if (user.firstName && user.lastName) return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    if (user.firstName) return user.firstName[0].toUpperCase()
    if (user.lastName) return user.lastName[0].toUpperCase()
    return user.username?.[0]?.toUpperCase() || "U"
  }

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="glass flex items-center space-x-2 rounded-2xl p-2 hover:bg-white/40 focus:outline-none transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#52C9A2] flex items-center justify-center text-white text-sm font-semibold overflow-hidden shadow-lg">
          {user.profilePicture ? (
            <Image src={user.profilePicture} alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
          ) : (
            <span className="flex w-full h-full items-center justify-center">{getInitials()}</span>
          )}
        </div>
        <span className="text-[#1a4d3e] text-sm font-medium hidden sm:block">{getDisplayName()}</span>
        <svg
          className={`ml-1 h-4 w-4 text-[#1a4d3e] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <motion.div
            className="absolute right-0 z-20 mt-3 w-64 origin-top-right glass-strong rounded-3xl shadow-2xl overflow-hidden"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="py-2">
              <div className="px-5 py-4 border-b border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#52C9A2] flex items-center justify-center text-white text-sm font-semibold overflow-hidden shadow-lg">
                    {user.profilePicture ? (
                      <Image src={user.profilePicture} alt="Profile" width={48} height={48} className="w-full h-full object-cover" />
                    ) : (
                      <span className="flex w-full h-full items-center justify-center">{getInitials()}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a4d3e]">{getDisplayName()}</p>
                    <p className="text-xs text-[#1a4d3e]/60">{user.email}</p>
                  </div>
                </div>
              </div>

              <Link
                href="/profile/edit"
                className="flex items-center px-5 py-3 text-sm text-[#1a4d3e] hover:bg-white/30 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5 mr-3 text-[#4A90E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Edit Profile
              </Link>

              <div className="border-t border-white/20 mt-1">
                <button
                  onClick={() => { setIsOpen(false); signOut() }}
                  className="flex items-center w-full px-5 py-3 text-sm text-red-600 hover:bg-red-50/30 transition-all"
                >
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
      </AnimatePresence>
    </div>
  )
}
