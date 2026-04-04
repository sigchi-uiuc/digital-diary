"use server"

import { revalidatePath } from "next/cache"
import { getAppSession } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { EntryType, Visibility } from "@prisma/client"

export async function getEntries() {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.entry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { entryLocations: true },
  })
}

export async function getEntry(id: string) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.entry.findFirst({
    where: { id, userId: session.user.id },
    include: { entryLocations: true },
  })
}

export async function createEntry(data: {
  type: string
  content: string
  visibility?: string
  qualityEmoji?: string | null
  mediaUrls?: string[]
  locations?: unknown
}) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const { type, content, visibility = "PRIVATE", qualityEmoji, mediaUrls = [], locations } = data

  if (!type || !content) throw new Error("Type and content are required")

  const entry = await prisma.entry.create({
    data: {
      userId: session.user.id,
      type: type as EntryType,
      content,
      visibility: visibility as Visibility,
      qualityEmoji,
      mediaUrls,
      locations: locations ?? undefined,
    },
    include: { entryLocations: true },
  })

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      journalEntriesCount: { increment: 1 },
      [visibility.toLowerCase() + "EntriesCount"]: { increment: 1 },
    },
  })

  revalidatePath("/")
  return entry
}

export async function updateEntry(
  id: string,
  data: {
    content?: string
    visibility?: string
    qualityEmoji?: string | null
    mediaUrls?: string[]
    locations?: unknown
  }
) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const existing = await prisma.entry.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!existing) throw new Error("Entry not found")

  const entry = await prisma.entry.update({
    where: { id },
    data: {
      content: data.content,
      visibility: data.visibility as Visibility | undefined,
      qualityEmoji: data.qualityEmoji,
      mediaUrls: data.mediaUrls,
      locations: data.locations ?? undefined,
    },
    include: { entryLocations: true },
  })

  revalidatePath("/")
  revalidatePath(`/entries/${id}`)
  return entry
}

export async function deleteEntry(id: string) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const existing = await prisma.entry.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!existing) throw new Error("Entry not found")

  await prisma.entry.delete({ where: { id } })

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      journalEntriesCount: { decrement: 1 },
      [existing.visibility.toLowerCase() + "EntriesCount"]: { decrement: 1 },
    },
  })

  revalidatePath("/")
}
