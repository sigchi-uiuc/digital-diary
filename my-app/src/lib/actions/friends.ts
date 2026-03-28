"use server"

import { revalidatePath } from "next/cache"
import { getAppSession } from "@/lib/auth"
import prisma from "@/lib/prisma"

type RelationshipStatus = "none" | "friend" | "outgoing_request" | "incoming_request" | "blocked"

function isMissingBlockedTable(error: unknown) {
  return (
    error instanceof Error &&
    error.message.includes("BlockedUser") &&
    error.message.includes("does not exist")
  )
}

async function loadBlockedIds(userId: string) {
  try {
    const rows = await prisma.$queryRaw<{ blockedId: string }[]>`
      SELECT "blockedId" FROM "BlockedUser" WHERE "blockerId" = ${userId}
    `
    return rows.map((r) => r.blockedId)
  } catch (error) {
    if (isMissingBlockedTable(error)) return []
    throw error
  }
}

function getRelationshipStatus(
  userId: string,
  outgoingIds: Set<string>,
  incomingIds: Set<string>,
  blockedIds: Set<string>
): RelationshipStatus {
  if (blockedIds.has(userId)) return "blocked"
  const hasOutgoing = outgoingIds.has(userId)
  const hasIncoming = incomingIds.has(userId)
  if (hasOutgoing && hasIncoming) return "friend"
  if (hasOutgoing) return "outgoing_request"
  if (hasIncoming) return "incoming_request"
  return "none"
}

export async function getFriends() {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const [user, blockedIdsList] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        friends: {
          select: { id: true, username: true, firstName: true, lastName: true, profilePicture: true },
          orderBy: { createdAt: "desc" },
        },
        friendsOf: {
          select: { id: true, username: true, firstName: true, lastName: true, profilePicture: true },
          orderBy: { createdAt: "desc" },
        },
      },
    }),
    loadBlockedIds(session.user.id),
  ])

  const outgoingRequests = user?.friends || []
  const incomingRequests = user?.friendsOf || []
  const outgoingIds = new Set(outgoingRequests.map((u) => u.id))
  const incomingIds = new Set(incomingRequests.map((u) => u.id))
  const blockedIds = new Set(blockedIdsList)

  const mutualFriends = outgoingRequests.filter((u) => incomingIds.has(u.id))

  return {
    friends: mutualFriends.filter((u) => !blockedIds.has(u.id)),
    blockedFriends: mutualFriends.filter((u) => blockedIds.has(u.id)),
    sentRequests: outgoingRequests.filter((u) => !incomingIds.has(u.id)),
    receivedRequests: incomingRequests.filter((u) => !outgoingIds.has(u.id)),
  }
}

export async function getFriendEntries() {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const userId = session.user.id

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      friends: { select: { id: true } },
      friendsOf: { select: { id: true } },
    },
  })

  const outgoingIds = new Set((user?.friends ?? []).map((u) => u.id))
  const incomingIds = new Set((user?.friendsOf ?? []).map((u) => u.id))
  const mutualFriendIds = [...outgoingIds].filter((id) => incomingIds.has(id))

  if (mutualFriendIds.length === 0) return []

  const blockedRows = await prisma
    .$queryRaw<{ blockedId: string }[]>`
      SELECT "blockedId" FROM "BlockedUser" WHERE "blockerId" = ${userId}
    `
    .catch(() => [] as { blockedId: string }[])

  const blockedIds = new Set(blockedRows.map((r) => r.blockedId))
  const visibleFriendIds = mutualFriendIds.filter((id) => !blockedIds.has(id))

  if (visibleFriendIds.length === 0) return []

  return prisma.entry.findMany({
    where: { userId: { in: visibleFriendIds }, visibility: "PUBLIC" },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      id: true,
      type: true,
      content: true,
      qualityEmoji: true,
      mediaUrls: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          profilePicture: true,
        },
      },
    },
  })
}

export async function getFriendProfile(friendId: string) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const viewerId = session.user.id
  const targetId = friendId.trim()

  if (!targetId) throw new Error("Missing friendId")
  if (targetId === viewerId) throw new Error("Use your profile page to view your own profile")

  const [viewer, blockedIdsList] = await Promise.all([
    prisma.user.findUnique({
      where: { id: viewerId },
      select: {
        friends: { where: { id: targetId }, select: { id: true } },
        friendsOf: { where: { id: targetId }, select: { id: true } },
      },
    }),
    loadBlockedIds(viewerId),
  ])

  const isFriend = Boolean(viewer?.friends.length && viewer?.friendsOf.length)
  const isBlocked = blockedIdsList.includes(targetId)

  if (!isFriend || isBlocked) return null

  return prisma.user.findUnique({
    where: { id: targetId },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      profilePicture: true,
      createdAt: true,
      publicEntriesCount: true,
      protectedEntriesCount: true,
      entries: {
        where: {
          OR: [{ visibility: "PUBLIC" }, { visibility: "PROTECTED" }],
        },
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
}

export async function sendFriendRequest(targetUserId: string) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  if (!targetUserId?.trim()) throw new Error("Missing userId")
  if (targetUserId === session.user.id) throw new Error("You cannot send a friend request to yourself")

  const [currentUser, targetUser, blockedIdsList] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        friends: { where: { id: targetUserId }, select: { id: true } },
        friendsOf: { where: { id: targetUserId }, select: { id: true } },
      },
    }),
    prisma.user.findUnique({ where: { id: targetUserId }, select: { id: true } }),
    loadBlockedIds(session.user.id),
  ])

  if (!currentUser || !targetUser) throw new Error("User not found")
  if (blockedIdsList.includes(targetUserId)) throw new Error("Unblock this user before sending a friend request")

  const hasOutgoing = currentUser.friends.length > 0
  const hasIncoming = currentUser.friendsOf.length > 0

  if (hasOutgoing && hasIncoming) return { success: true, status: "friend" }
  if (hasOutgoing) return { success: true, status: "outgoing_request" }
  if (hasIncoming) throw new Error("This user has already sent you a friend request")

  await prisma.user.update({
    where: { id: session.user.id },
    data: { friends: { connect: { id: targetUserId } } },
  })

  revalidatePath("/friends")
  return { success: true, status: "outgoing_request" }
}

export async function acceptFriendRequest(targetUserId: string) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  if (!targetUserId?.trim()) throw new Error("Missing userId")
  if (targetUserId === session.user.id) throw new Error("You cannot accept your own friend request")

  const [currentUser, targetUser, blockedIdsList] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        friends: { where: { id: targetUserId }, select: { id: true } },
        friendsOf: { where: { id: targetUserId }, select: { id: true } },
      },
    }),
    prisma.user.findUnique({ where: { id: targetUserId }, select: { id: true } }),
    loadBlockedIds(session.user.id),
  ])

  if (!currentUser || !targetUser) throw new Error("User not found")
  if (blockedIdsList.includes(targetUserId)) throw new Error("Unblock this user before accepting the friend request")

  const hasOutgoing = currentUser.friends.length > 0
  const hasIncoming = currentUser.friendsOf.length > 0

  if (hasOutgoing && hasIncoming) return { success: true, status: "friend" }
  if (!hasIncoming) throw new Error("No incoming friend request from this user")

  await prisma.user.update({
    where: { id: session.user.id },
    data: { friends: { connect: { id: targetUserId } } },
  })

  revalidatePath("/friends")
  return { success: true, status: "friend" }
}

export async function blockUser(targetUserId: string) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  if (!targetUserId?.trim()) throw new Error("Missing userId")
  if (targetUserId === session.user.id) throw new Error("Cannot block yourself")

  await prisma.$executeRaw`
    INSERT INTO "BlockedUser" ("blockerId", "blockedId", "createdAt")
    VALUES (${session.user.id}, ${targetUserId}, NOW())
    ON CONFLICT DO NOTHING
  `

  revalidatePath("/friends")
  return { success: true }
}

export async function unblockUser(targetUserId: string) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  if (!targetUserId?.trim()) throw new Error("Missing userId")

  await prisma.$executeRaw`
    DELETE FROM "BlockedUser" WHERE "blockerId" = ${session.user.id} AND "blockedId" = ${targetUserId}
  `

  revalidatePath("/friends")
  return { success: true }
}

export async function searchUsers(q: string, take = 20) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const trimmed = q.trim()
  if (trimmed.length < 2) return { users: [] }

  const limit = Math.min(Math.max(take, 1), 20)

  const [currentUser, blockedIdsList] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        friends: { select: { id: true } },
        friendsOf: { select: { id: true } },
      },
    }),
    loadBlockedIds(session.user.id),
  ])

  const outgoingIds = new Set((currentUser?.friends || []).map((u) => u.id))
  const incomingIds = new Set((currentUser?.friendsOf || []).map((u) => u.id))
  const blockedIds = new Set(blockedIdsList)

  const users = await prisma.user.findMany({
    where: {
      id: { not: session.user.id },
      OR: [
        { username: { contains: trimmed, mode: "insensitive" } },
        { firstName: { contains: trimmed, mode: "insensitive" } },
        { lastName: { contains: trimmed, mode: "insensitive" } },
      ],
    },
    select: { id: true, username: true, firstName: true, lastName: true, profilePicture: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  })

  return {
    users: users.map((u) => ({
      ...u,
      relationshipStatus: getRelationshipStatus(u.id, outgoingIds, incomingIds, blockedIds),
    })),
  }
}
