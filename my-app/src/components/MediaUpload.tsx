"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { uploadMedia } from "@/lib/actions/media"
import { staggerContainer, mediaItem, overlayFade } from "@/lib/animations"
import { CameraIcon } from "@/components/icons"

interface MediaUploadProps {
  mediaUrls: string[]
  onMediaChange: (urls: string[]) => void
  maxFiles?: number
}

export default function MediaUpload({ mediaUrls, onMediaChange, maxFiles = 10 }: MediaUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (mediaUrls.length + files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files`)
      return
    }

    setError("")
    setUploading(true)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append("media", file)

        const result = await uploadMedia(formData)
        return result.url
      })

      const newUrls = await Promise.all(uploadPromises)
      onMediaChange([...mediaUrls, ...newUrls])
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to upload files")
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const removeMedia = (index: number) => {
    const newUrls = mediaUrls.filter((_, i) => i !== index)
    onMediaChange(newUrls)
  }

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
  }

  const isVideo = (url: string) => {
    return /\.(mp4|webm|ogg|mov)$/i.test(url)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#1a4d3e] mb-2">
          Add Media (Images or Videos)
        </label>
        <div className="flex items-center gap-4">
          <motion.button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || mediaUrls.length >= maxFiles}
            className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#4A90E2]/40 rounded-2xl text-sm font-medium text-[#1a4d3e] hover:border-[#4A90E2] hover:bg-[#4A90E2]/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <CameraIcon className="w-4 h-4" />
            {uploading ? "Uploading…" : "Choose Files"}
          </motion.button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading || mediaUrls.length >= maxFiles}
          />
          <AnimatePresence>
            {mediaUrls.length > 0 && (
              <motion.span
                key={mediaUrls.length}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-[#1a4d3e]/60"
              >
                {mediaUrls.length} file{mediaUrls.length !== 1 ? "s" : ""} selected
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <p className="mt-1 text-xs text-[#1a4d3e]/50">
          Upload images (JPEG, PNG, GIF, WebP — max 10MB) or videos (MP4, WebM, OGG, MOV — max 50MB)
        </p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            key="error"
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass rounded-2xl border-2 border-red-200/50 p-4"
          >
            <p className="text-red-700 text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {mediaUrls.length > 0 && (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {mediaUrls.map((url, index) => (
            <motion.div key={index} className="relative group" variants={mediaItem}>
              {isImage(url) ? (
                <img
                  src={url}
                  alt={`Media ${index + 1}`}
                  className="w-full h-32 object-cover rounded-xl border border-white/30"
                />
              ) : isVideo(url) ? (
                <video
                  src={url}
                  className="w-full h-32 object-cover rounded-xl border border-white/30"
                  controls={false}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-32 glass rounded-xl border border-white/30 flex items-center justify-center">
                  <span className="text-[#1a4d3e]/50 text-sm">Media</span>
                </div>
              )}
              <motion.button
                type="button"
                onClick={() => removeMedia(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                aria-label="Remove media"
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
