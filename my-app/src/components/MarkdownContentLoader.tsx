"use client"

import dynamic from "next/dynamic"

const MarkdownContent = dynamic(() => import("@/components/MarkdownContent"), {
  ssr: false,
  loading: () => (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 bg-white/40 rounded w-3/4" />
      <div className="h-4 bg-white/40 rounded w-full" />
      <div className="h-4 bg-white/40 rounded w-5/6" />
    </div>
  ),
})

export default function MarkdownContentLoader({ content }: { content: string }) {
  return <MarkdownContent content={content} />
}
