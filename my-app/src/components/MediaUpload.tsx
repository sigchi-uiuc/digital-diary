"use client"

import { useState, useRef } from "react"
import { uploadMedia } from "@/lib/actions/media"

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
      // Reset file input
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Media (Images or Videos)
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || mediaUrls.length >= maxFiles}
            className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {uploading ? "Uploading..." : "📷 Choose Files"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading || mediaUrls.length >= maxFiles}
          />
          {mediaUrls.length > 0 && (
            <span className="text-sm text-gray-500">
              {mediaUrls.length} file{mediaUrls.length !== 1 ? "s" : ""} selected
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Upload images (JPEG, PNG, GIF, WebP - max 10MB) or videos (MP4, WebM, OGG, MOV - max 50MB)
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {mediaUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {mediaUrls.map((url, index) => (
            <div key={index} className="relative group">
              {isImage(url) ? (
                <img
                  src={url}
                  alt={`Media ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
              ) : isVideo(url) ? (
                <video
                  src={url}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  controls={false}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Media</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => removeMedia(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                aria-label="Remove media"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

