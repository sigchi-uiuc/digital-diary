"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const getDisplayName = () => {
    if (session?.user?.firstName && session?.user?.lastName) {
      return `${session.user.firstName} ${session.user.lastName}`
    } else if (session?.user?.firstName) {
      return session.user.firstName
    } else if (session?.user?.lastName) {
      return session.user.lastName
    }
    return session?.user?.username || "User"
  }

  const getInitials = () => {
    if (session?.user?.firstName && session?.user?.lastName) {
      return `${session.user.firstName.charAt(0)}${session.user.lastName.charAt(0)}`.toUpperCase()
    } else if (session?.user?.firstName) {
      return session.user.firstName.charAt(0).toUpperCase()
    } else if (session?.user?.lastName) {
      return session.user.lastName.charAt(0).toUpperCase()
    }
    return session?.user?.username?.charAt(0).toUpperCase() || "U"
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="glass flex items-center space-x-2 rounded-2xl p-2 hover:bg-white/40 focus:outline-none transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#52C9A2] flex items-center justify-center text-white text-sm font-semibold overflow-hidden shadow-lg">
            {session?.user?.profilePicture ? (
              <img
                src={session.user.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                  if (nextElement) nextElement.style.display = 'flex'
                }}
              />
            ) : null}
            <span className={`${session?.user?.profilePicture ? 'hidden' : 'flex'} w-full h-full items-center justify-center`}>
              {getInitials()}
            </span>
          </div>
          <span className="text-[#1a4d3e] text-sm font-medium hidden sm:block">
            {getDisplayName()}
          </span>
          <svg
            className={`ml-1 h-4 w-4 text-[#1a4d3e] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute right-0 z-20 mt-3 w-64 origin-top-right glass-strong rounded-3xl shadow-2xl overflow-hidden">
            <div className="py-2">
              {/* Profile Info */}
              <div className="px-5 py-4 border-b border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#52C9A2] flex items-center justify-center text-white text-sm font-semibold overflow-hidden shadow-lg">
                    {session?.user?.profilePicture ? (
                      <img
                        src={session.user.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                          if (nextElement) nextElement.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <span className={`${session?.user?.profilePicture ? 'hidden' : 'flex'} w-full h-full items-center justify-center`}>
                      {getInitials()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a4d3e]">{getDisplayName()}</p>
                    <p className="text-xs text-[#1a4d3e]/60">{session?.user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
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
                  onClick={() => {
                    setIsOpen(false)
                    signOut()
                  }}
                  className="flex items-center w-full px-5 py-3 text-sm text-red-600 hover:bg-red-50/30 transition-all"
                >
                  <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
