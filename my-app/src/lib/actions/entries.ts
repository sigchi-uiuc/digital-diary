"use server"

import { revalidatePath } from "next/cache"
import { getAppSession } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { EntryType, Visibility } from "@prisma/client"
import { createEntrySchema, updateEntrySchema } from "@/lib/validation/schemas"
import { canViewFriendResources } from "@/lib/actions/friends"

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

  const entry = await prisma.entry.findUnique({
    where: { id },
    include: { entryLocations: true },
  })
  if (!entry) return null

  // Owner always allowed.
  if (entry.userId === session.user.id) return entry

  // Friends may view entries shared with PUBLIC/PROTECTED visibility, provided
  // the relationship is mutual and neither side has blocked the other.
  if (entry.visibility === "PRIVATE") return null
  const allowed = await canViewFriendResources(session.user.id, entry.userId)
  if (!allowed) return null

  return entry
}

export async function createEntry(data: unknown) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const parsed = createEntrySchema.parse(data)
  const { type, content, visibility, qualityEmoji, mediaUrls, locations } = parsed

  const entry = await prisma.entry.create({
    data: {
      userId: session.user.id,
      type: type as EntryType,
      content,
      visibility: visibility as Visibility,
      qualityEmoji: qualityEmoji ?? null,
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

export async function updateEntry(id: string, data: unknown) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const parsed = updateEntrySchema.parse(data)

  const existing = await prisma.entry.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!existing) throw new Error("Entry not found")

  const entry = await prisma.entry.update({
    where: { id },
    data: {
      content: parsed.content,
      visibility: parsed.visibility as Visibility | undefined,
      qualityEmoji: parsed.qualityEmoji,
      mediaUrls: parsed.mediaUrls,
      locations: parsed.locations ?? undefined,
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
