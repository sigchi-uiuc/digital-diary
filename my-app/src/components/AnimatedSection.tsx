"use client"

import { motion, type Variants } from "framer-motion"
import { fadeUp, sectionReveal, staggerContainer, heroReveal } from "@/lib/animations"

type Preset = "fadeUp" | "reveal" | "stagger" | "hero"

const presets: Record<Preset, Variants> = {
  fadeUp,
  reveal: sectionReveal,
  stagger: staggerContainer,
  hero: heroReveal,
}

interface Props {
  children: React.ReactNode
  preset?: Preset
  variants?: Variants
  className?: string
  delay?: number
  as?: "div" | "section" | "article" | "main"
}

export default function AnimatedSection({
  children,
  preset = "reveal",
  variants,
  className,
  delay = 0,
  as = "div",
}: Props) {
  const Component = motion.create(as)
  const v = variants ?? presets[preset]

  return (
    <Component
      className={className}
      variants={v}
      initial="hidden"
      animate="visible"
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Component>
  )
}
