"use server"

import { revalidatePath } from "next/cache"
import { getAppSession } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { rateLimit } from "@/lib/rateLimit"

type RelationshipStatus = "none" | "friend" | "outgoing_request" | "incoming_request" | "blocked"

const RELATIONSHIP_RATE_LIMIT = { limit: 20, windowSeconds: 60 }
const SEARCH_RATE_LIMIT = { limit: 30, windowSeconds: 60 }

function enforceRateLimit(userId: string, bucket: string, opts: { limit: number; windowSeconds: number }) {
  const result = rateLimit(`${bucket}:${userId}`, opts)
  if (!result.success) {
    throw new Error(`Rate limited. Try again in ${result.retryAfterSeconds}s`)
  }
}

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

/** IDs of users who have blocked `userId` (i.e. `userId` is the target). */
async function loadBlockedByIds(userId: string) {
  try {
    const rows = await prisma.$queryRaw<{ blockerId: string }[]>`
      SELECT "blockerId" FROM "BlockedUser" WHERE "blockedId" = ${userId}
    `
    return rows.map((r) => r.blockerId)
  } catch (error) {
    if (isMissingBlockedTable(error)) return []
    throw error
  }
}

function getRelationshipStatus(
  userId: string,
  outgoingIds: Set<string>,
  incomingIds: Set<string>,
  blockedIds: Set<string>,
  blockedByIds: Set<string>
): RelationshipStatus {
  if (blockedIds.has(userId) || blockedByIds.has(userId)) return "blocked"
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

  const [user, blockedIdsList, blockedByIdsList] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        friends: { select: { id: true } },
        friendsOf: { select: { id: true } },
      },
    }),
    loadBlockedIds(userId),
    loadBlockedByIds(userId),
  ])

  const outgoingIds = new Set((user?.friends ?? []).map((u) => u.id))
  const incomingIds = new Set((user?.friendsOf ?? []).map((u) => u.id))
  const mutualFriendIds = [...outgoingIds].filter((id) => incomingIds.has(id))

  if (mutualFriendIds.length === 0) return []

  const blockedSet = new Set([...blockedIdsList, ...blockedByIdsList])
  const visibleFriendIds = mutualFriendIds.filter((id) => !blockedSet.has(id))

  if (visibleFriendIds.length === 0) return []

  return prisma.entry.findMany({
    where: {
      userId: { in: visibleFriendIds },
      visibility: { in: ["PUBLIC", "PROTECTED"] },
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

  const [viewer, viewerBlocked, viewerBlockedBy] = await Promise.all([
    prisma.user.findUnique({
      where: { id: viewerId },
      select: {
        friends: { where: { id: targetId }, select: { id: true } },
        friendsOf: { where: { id: targetId }, select: { id: true } },
      },
    }),
    loadBlockedIds(viewerId),
    loadBlockedByIds(viewerId),
  ])

  const isFriend = Boolean(viewer?.friends.length && viewer?.friendsOf.length)
  const isBlocked = viewerBlocked.includes(targetId) || viewerBlockedBy.includes(targetId)

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

  enforceRateLimit(session.user.id, "friend_mutation", RELATIONSHIP_RATE_LIMIT)

  const [currentUser, targetUser, blockedIdsList, blockedByIdsList] = await Promise.all([
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
    loadBlockedByIds(session.user.id),
  ])

  if (!currentUser || !targetUser) throw new Error("User not found")
  if (blockedIdsList.includes(targetUserId)) throw new Error("Unblock this user before sending a friend request")
  if (blockedByIdsList.includes(targetUserId)) throw new Error("Unable to send a friend request to this user")

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

  enforceRateLimit(session.user.id, "friend_mutation", RELATIONSHIP_RATE_LIMIT)

  const [currentUser, targetUser, blockedIdsList, blockedByIdsList] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        friends: { where: { id: targetUserId }, select: { id: true } },
        friendsOf: { where: { id: targetUserId }, select: { id: true } },
      },
    }),
    prisma.user.findUnique({ where: { id: targetUserId }, select: { id: true } }),
    loadBlockedIds(session.user.id),
    loadBlockedByIds(session.user.id),
  ])

  if (!currentUser || !targetUser) throw new Error("User not found")
  if (blockedIdsList.includes(targetUserId)) throw new Error("Unblock this user before accepting the friend request")
  if (blockedByIdsList.includes(targetUserId)) throw new Error("Unable to accept this friend request")

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

export async function removeFriend(targetUserId: string) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  if (!targetUserId?.trim()) throw new Error("Missing userId")
  if (targetUserId === session.user.id) throw new Error("Cannot unfriend yourself")

  enforceRateLimit(session.user.id, "friend_mutation", RELATIONSHIP_RATE_LIMIT)

  // Sever both sides of the UserFriends relation so neither user considers the
  // other a friend or a pending request.
  await prisma.$transaction([
    prisma.user.update({
      where: { id: session.user.id },
      data: {
        friends: { disconnect: { id: targetUserId } },
        friendsOf: { disconnect: { id: targetUserId } },
      },
    }),
    prisma.user.update({
      where: { id: targetUserId },
      data: {
        friends: { disconnect: { id: session.user.id } },
        friendsOf: { disconnect: { id: session.user.id } },
      },
    }),
  ])

  revalidatePath("/friends")
  revalidatePath(`/friends/${targetUserId}`)
  return { success: true }
}

export async function blockUser(targetUserId: string) {
  const session = await getAppSession()
  if (!session?.user?.id) throw new Error("Unauthorized")

  if (!targetUserId?.trim()) throw new Error("Missing userId")
  if (targetUserId === session.user.id) throw new Error("Cannot block yourself")

  enforceRateLimit(session.user.id, "friend_mutation", RELATIONSHIP_RATE_LIMIT)

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

  enforceRateLimit(session.user.id, "friend_mutation", RELATIONSHIP_RATE_LIMIT)

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

  enforceRateLimit(session.user.id, "search", SEARCH_RATE_LIMIT)

  const limit = Math.min(Math.max(take, 1), 20)

  const [currentUser, blockedIdsList, blockedByIdsList] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        friends: { select: { id: true } },
        friendsOf: { select: { id: true } },
      },
    }),
    loadBlockedIds(session.user.id),
    loadBlockedByIds(session.user.id),
  ])

  const outgoingIds = new Set((currentUser?.friends || []).map((u) => u.id))
  const incomingIds = new Set((currentUser?.friendsOf || []).map((u) => u.id))
  const blockedIds = new Set(blockedIdsList)
  const blockedByIds = new Set(blockedByIdsList)

  const users = await prisma.user.findMany({
    where: {
      id: { not: session.user.id },
      // Hide users who have blocked the viewer entirely from search results.
      NOT: { id: { in: [...blockedByIds] } },
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
      relationshipStatus: getRelationshipStatus(u.id, outgoingIds, incomingIds, blockedIds, blockedByIds),
    })),
  }
}

/**
 * Returns true if viewer is allowed to read resources owned by targetUserId
 * (e.g., media files, profile picture). Requires mutual friendship and no
 * active block in either direction.
 */
export async function canViewFriendResources(viewerId: string, targetUserId: string): Promise<boolean> {
  if (!viewerId || !targetUserId) return false
  if (viewerId === targetUserId) return true

  const [viewer, blocked, blockedBy] = await Promise.all([
    prisma.user.findUnique({
      where: { id: viewerId },
      select: {
        friends: { where: { id: targetUserId }, select: { id: true } },
        friendsOf: { where: { id: targetUserId }, select: { id: true } },
      },
    }),
    loadBlockedIds(viewerId),
    loadBlockedByIds(viewerId),
  ])

  const isFriend = Boolean(viewer?.friends.length && viewer?.friendsOf.length)
  if (!isFriend) return false
  if (blocked.includes(targetUserId) || blockedBy.includes(targetUserId)) return false
  return true
}
