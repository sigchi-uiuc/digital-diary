"use client"

import { motion } from "framer-motion"
import { navSlideDown } from "@/lib/animations"

interface AnimatedNavProps {
  children: React.ReactNode
  className?: string
}

export default function AnimatedNav({ children, className }: AnimatedNavProps) {
  return (
    <motion.nav
      className={className}
      variants={navSlideDown}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.nav>
  )
}
