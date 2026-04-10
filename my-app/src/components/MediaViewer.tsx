"use client"

interface MediaViewerProps {
  mediaUrls: string[]
}

export default function MediaViewer({ mediaUrls }: MediaViewerProps) {
  if (!mediaUrls || mediaUrls.length === 0) return null

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-[#1a4d3e] mb-4">Media</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {mediaUrls.map((url, index) => {
          const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
          const isAudio = /\/voice-[^/]+\.(webm|ogg|wav|mp3)$/i.test(url)
          const isVideo = !isAudio && /\.(mp4|webm|ogg|mov)$/i.test(url)

          return (
            <div key={index} className="relative group">
              {isImage ? (
                <img
                  src={url}
                  alt={`Media ${index + 1}`}
                  className="w-full h-48 object-cover rounded-xl border border-white/30 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => window.open(url, "_blank")}
                />
              ) : isAudio ? (
                <div className="glass rounded-xl p-4 flex items-center gap-3 col-span-full">
                  <span className="text-2xl shrink-0">&#127897;</span>
                  <audio controls src={url} className="flex-1 min-w-0">
                    Your browser does not support the audio tag.
                  </audio>
                </div>
              ) : isVideo ? (
                <video
                  src={url}
                  className="w-full h-48 object-cover rounded-xl border border-white/30"
                  controls
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-48 glass rounded-xl flex items-center justify-center">
                  <span className="text-[#1a4d3e]/50 text-sm">Media</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
