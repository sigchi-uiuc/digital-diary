"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { dropdownVariants } from "@/lib/animations"

export default function CreateEntryDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="btn-glossy inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="mr-2"></span>
          Create New Entry
          <svg
            className={`ml-2 h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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

      <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown menu */}
          <motion.div
            className="absolute right-0 z-20 mt-3 w-72 origin-top-right bg-white rounded-3xl shadow-2xl overflow-hidden"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="py-2">
              <div className="px-5 py-3 text-xs font-semibold text-[#1a4d3e]/70 uppercase tracking-wider border-b border-white/20">
                Choose Entry Type
              </div>
              
              <Link
                href="/entries/create/freewrite"
                className="flex items-center px-5 py-4 text-sm text-[#1a4d3e] hover:bg-white/100 transition-all group"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-[#1a4d3e]">Freewrite</div>
                  <div className="text-xs text-[#1a4d3e]/60">Express your thoughts freely</div>
                </div>
              </Link>
              
              <Link
                href="/entries/create/guided"
                className="flex items-center px-5 py-4 text-sm text-[#1a4d3e] hover:bg-white/30 transition-all group"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#52C9A2] to-[#63D4B3] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-[#1a4d3e]">Guided</div>
                  <div className="text-xs text-[#1a4d3e]/60">Follow prompts and structure</div>
                </div>
              </Link>
            </div>
          </motion.div>
        </>
      )}
      </AnimatePresence>
    </div>
  )
}
