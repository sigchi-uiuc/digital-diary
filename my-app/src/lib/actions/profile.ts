"use server"

import { revalidatePath } from "next/cache"
import { getAppSession } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { writeFile, mkdir, unlink } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import sharp from "sharp"

const PROFILE_SELECT = {
  id: true,
  username: true,
  firstName: true,
  lastName: true,
  email: true,
  profilePicture: true,
  trackingMode: true,
  createdAt: true,
  updatedAt: true,
  journalEntriesCount: true,
  privateEntriesCount: true,
  publicEntriesCount: true,
  protectedEntriesCount: true,
} as const

export async function getProfile() {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: PROFILE_SELECT,
  })
  if (!user) throw new Error("User not found")
  return user
}

export async function getOwnProfile() {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      ...PROFILE_SELECT,
      entries: {
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          type: true,
          visibility: true,
          content: true,
          qualityEmoji: true,
          mediaUrls: true,
          createdAt: true,
        },
      },
    },
  })
  if (!user) throw new Error("User not found")
  return user
}

function assertSafeProfilePicture(value: string | null | undefined) {
  if (value == null || value === "") return
  // Only allow relative paths we serve ourselves — prevents storing attacker-
  // controlled absolute URLs (phishing/open-redirect via profile pic).
  if (!value.startsWith("/api/uploads/profiles/")) {
    throw new Error("Invalid profile picture URL")
  }
}

export async function updateProfile(data: {
  firstName?: string
  lastName?: string
  profilePicture?: string | null
  trackingMode?: string
}) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  if (data.profilePicture !== undefined) {
    assertSafeProfilePicture(data.profilePicture)
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      profilePicture: data.profilePicture !== undefined ? data.profilePicture || null : undefined,
      trackingMode: data.trackingMode || undefined,
    },
    select: PROFILE_SELECT,
  })

  revalidatePath("/profile/edit")
  return user
}

export async function uploadProfilePicture(formData: FormData) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const file = formData.get("profilePicture") as File
  if (!file) throw new Error("No file uploaded")

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.")
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File too large. Please upload an image smaller than 5MB.")
  }

  const fileExtension = file.name.split(".").pop()?.toLowerCase()
  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"]
  if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
    throw new Error("Invalid file extension.")
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { profilePicture: true },
  })

  const uploadsDir = join(process.cwd(), "data", "uploads", "profiles")
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }

  const fileName = `${session.user.id}-${Date.now()}.${fileExtension}`
  const filePath = join(uploadsDir, fileName)

  const bytes = await file.arrayBuffer()
  let buffer: Buffer = Buffer.from(new Uint8Array(bytes))

  try {
    const isAnimated = ["gif", "webp"].includes(fileExtension)
    buffer = await sharp(buffer, { animated: isAnimated }).rotate().toBuffer()
  } catch {
    // Continue with original buffer
  }

  await writeFile(filePath, buffer)

  const publicUrl = `/api/uploads/profiles/${fileName}`

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: { profilePicture: publicUrl },
    select: PROFILE_SELECT,
  })

  // Clean up old profile picture
  if (currentUser?.profilePicture && currentUser.profilePicture !== publicUrl) {
    const oldFileName = currentUser.profilePicture.split("/").pop()
    if (oldFileName && oldFileName.startsWith(session.user.id)) {
      // Try both new private path and legacy public path
      const candidates = [
        join(process.cwd(), "data", "uploads", "profiles", oldFileName),
        join(process.cwd(), "public", "uploads", "profiles", oldFileName),
      ]
      for (const candidate of candidates) {
        try {
          if (existsSync(candidate)) await unlink(candidate)
        } catch {
          // Non-fatal
        }
      }
    }
  }

  revalidatePath("/profile/edit")
  return { profilePicture: publicUrl, user: updatedUser }
}
