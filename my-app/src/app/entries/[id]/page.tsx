import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { getAppSession } from "@/lib/auth"
import { getEntry } from "@/lib/actions/entries"
import MediaViewer from "@/components/MediaViewer"
import AnimatedSection from "@/components/AnimatedSection"
import AnimatedNav from "@/components/AnimatedNav"
import MarkdownContentLoader from "@/components/MarkdownContentLoader"

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default async function ViewEntry({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getAppSession()
  if (!session) redirect("/auth/signin")

  const { id } = await params
  const entry = await getEntry(id)

  if (!entry) notFound()

  return (
    <div className="min-h-screen relative z-10">
      <AnimatedNav className="glass-strong sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              href="/"
              className="glass rounded-2xl px-4 py-2 text-sm font-medium text-[#1a4d3e] hover:bg-white/40 transition-all"
            >
              ← Digital Diary
            </Link>
            <Link
              href={`/entries/${entry.id}/edit`}
              className="glass rounded-2xl px-4 py-2 text-sm font-medium text-[#4A90E2] hover:bg-white/40 transition-all"
            >
              Edit
            </Link>
          </div>
        </div>
      </AnimatedNav>

      <main className="max-w-4xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <AnimatedSection preset="reveal">
            <div className="panel-soft overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/20">
                <div className="flex items-center space-x-2 mb-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      entry.type === "FREEWRITE"
                        ? "bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white shadow-lg"
                        : "bg-gradient-to-r from-[#52C9A2] to-[#63D4B3] text-white shadow-lg"
                    }`}
                  >
                    {entry.type === "FREEWRITE" ? "Freewrite" : "Guided"}
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      entry.visibility === "PRIVATE"
                        ? "glass text-[#1a4d3e]"
                        : "bg-gradient-to-r from-[#52C9A2] to-[#63D4B3] text-white"
                    }`}
                  >
                    {entry.visibility === "PRIVATE" ? "private" : "shared"}
                  </span>
                  {entry.qualityEmoji && (
                    <span className="text-xl">{entry.qualityEmoji}</span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-[#1a4d3e]">
                  Entry from {formatDate(entry.createdAt.toISOString())}
                </h1>
                <div className="mt-2 text-sm text-[#1a4d3e]/60 flex items-center gap-2 flex-wrap">
                  <span>Created: {formatDate(entry.createdAt.toISOString())}</span>
                  {entry.updatedAt.toISOString() !== entry.createdAt.toISOString() && (
                    <>
                      <span>•</span>
                      <span>Updated: {formatDate(entry.updatedAt.toISOString())}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {entry.content ? (
                  <div className="max-w-none">
                    <MarkdownContentLoader content={entry.content} />
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#1a4d3e]/50">
                    <p>No content available for this entry.</p>
                  </div>
                )}

                <MediaViewer mediaUrls={entry.mediaUrls} />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </div>
  )
}
