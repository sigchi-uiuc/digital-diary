"use server"

import { getAppSession } from "@/lib/auth"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import sharp from "sharp"

export async function uploadAudio(formData: FormData) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const file = formData.get("audio") as File
  if (!file) throw new Error("No audio file uploaded")

  const allowedAudioTypes = ["audio/webm", "audio/ogg", "audio/wav", "audio/mpeg"]
  if (!allowedAudioTypes.includes(file.type)) {
    throw new Error("Invalid audio file type.")
  }

  if (file.size > 50 * 1024 * 1024) {
    throw new Error("Audio file too large. Please upload a file smaller than 50MB.")
  }

  const mimeToExt: Record<string, string> = {
    "audio/webm": "webm",
    "audio/ogg": "ogg",
    "audio/wav": "wav",
    "audio/mpeg": "mp3",
  }
  const fileExtension = mimeToExt[file.type] ?? "webm"

  const uploadsDir = join(process.cwd(), "public", "uploads", "entries")
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }

  const fileName = `voice-${session.user.id}-${Date.now()}.${fileExtension}`
  const filePath = join(uploadsDir, fileName)

  const bytes = await file.arrayBuffer()
  await writeFile(filePath, Buffer.from(new Uint8Array(bytes)))

  return {
    url: `/uploads/entries/${fileName}`,
    type: file.type,
    size: file.size,
  }
}

export async function uploadMedia(formData: FormData) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const file = formData.get("media") as File
  if (!file) throw new Error("No file uploaded")

  const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
  const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"]
  const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes]

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Invalid file type. Please upload an image (JPEG, PNG, GIF, WebP) or video (MP4, WebM, OGG, MOV)."
    )
  }

  const isVideo = allowedVideoTypes.includes(file.type)
  const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024
  if (file.size > maxSize) {
    throw new Error(`File too large. Please upload a file smaller than ${isVideo ? "50MB" : "10MB"}.`)
  }

  const fileExtension = file.name.split(".").pop()?.toLowerCase()
  const allowedExtensions = isVideo
    ? ["mp4", "webm", "ogg", "mov"]
    : ["jpg", "jpeg", "png", "gif", "webp"]

  if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
    throw new Error(`Invalid file extension. Please upload a ${isVideo ? "video" : "image"} file.`)
  }

  const uploadsDir = join(process.cwd(), "public", "uploads", "entries")
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }

  const fileName = `${session.user.id}-${Date.now()}.${fileExtension}`
  const filePath = join(uploadsDir, fileName)

  const bytes = await file.arrayBuffer()
  let buffer: Buffer = Buffer.from(new Uint8Array(bytes))

  if (!isVideo) {
    try {
      const isAnimated = ["gif", "webp"].includes(fileExtension)
      buffer = await sharp(buffer, { animated: isAnimated }).rotate().toBuffer()
    } catch {
      // Continue with original buffer
    }
  }

  await writeFile(filePath, buffer)

  return {
    url: `/uploads/entries/${fileName}`,
    type: file.type,
    size: file.size,
  }
}
