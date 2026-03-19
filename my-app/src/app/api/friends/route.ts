import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { PrismaClient } from "@prisma/client"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

function isMissingBlockedTable(error: unknown) {
  return error instanceof Error && error.message.includes('BlockedUser') && error.message.includes('does not exist')
}

async function loadBlockedIds(userId: string) {
  try {
    const rows = await prisma.$queryRaw<{ blockedId: string }[]>`
      SELECT "blockedId"
      FROM "BlockedUser"
      WHERE "blockerId" = ${userId}
    `

    return rows.map((row) => row.blockedId)
  } catch (error) {
    if (isMissingBlockedTable(error)) {
      return []
    }
    throw error
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [user, blockedIdsList] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          friends: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
            },
            orderBy: { createdAt: "desc" },
          },
          friendsOf: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
            },
            orderBy: { createdAt: "desc" },
          },
        },
      }),
      loadBlockedIds(session.user.id),
    ])

    const outgoingRequests = user?.friends || []
    const incomingRequests = user?.friendsOf || []
    const outgoingIds = new Set(outgoingRequests.map((entry) => entry.id))
    const incomingIds = new Set(incomingRequests.map((entry) => entry.id))
    const blockedIds = new Set(blockedIdsList)

    const mutualFriends = outgoingRequests.filter((entry) => incomingIds.has(entry.id))
    const friends = mutualFriends.filter((entry) => !blockedIds.has(entry.id))
    const blockedFriends = mutualFriends.filter((entry) => blockedIds.has(entry.id))
    const sentRequests = outgoingRequests.filter((entry) => !incomingIds.has(entry.id))
    const receivedRequests = incomingRequests.filter((entry) => !outgoingIds.has(entry.id))

    return NextResponse.json({
      friends,
      blockedFriends,
      sentRequests,
      receivedRequests,
    })
  } catch (error) {
    console.error("Error loading friends:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json().catch(() => null)
    const targetUserId = typeof body?.userId === "string" ? body.userId.trim() : ""

    if (!targetUserId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    if (targetUserId === session.user.id) {
      return NextResponse.json({ error: "You cannot send a friend request to yourself" }, { status: 400 })
    }

    const [currentUser, targetUser, blockedIdsList] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          friends: { where: { id: targetUserId }, select: { id: true } },
          friendsOf: { where: { id: targetUserId }, select: { id: true } },
        },
      }),
      prisma.user.findUnique({
        where: { id: targetUserId },
        select: { id: true },
      }),
      loadBlockedIds(session.user.id),
    ])

    if (!currentUser || !targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (blockedIdsList.includes(targetUserId)) {
      return NextResponse.json({ error: "Unblock this user before sending a friend request" }, { status: 409 })
    }

    const hasOutgoingRequest = currentUser.friends.length > 0
    const hasIncomingRequest = currentUser.friendsOf.length > 0

    if (hasOutgoingRequest && hasIncomingRequest) {
      return NextResponse.json({ success: true, status: "friend" })
    }

    if (hasOutgoingRequest) {
      return NextResponse.json({ success: true, status: "outgoing_request" })
    }

    if (hasIncomingRequest) {
      return NextResponse.json(
        { error: "This user has already sent you a friend request" },
        { status: 409 }
      )
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        friends: {
          connect: { id: targetUserId },
        },
      },
    })

    return NextResponse.json({ success: true, status: "outgoing_request" })
  } catch (error) {
    console.error("Error sending friend request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
