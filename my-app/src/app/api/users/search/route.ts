import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { PrismaClient } from "@prisma/client"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

type RelationshipStatus = "none" | "friend" | "outgoing_request" | "incoming_request" | "blocked"

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

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const q = (searchParams.get("q") || "").trim()
    const takeParam = parseInt(searchParams.get("take") || "20", 10)
    const take = Number.isNaN(takeParam) ? 20 : Math.min(Math.max(takeParam, 1), 20)

    if (q.length < 2) {
      return NextResponse.json({ users: [] })
    }

    const [currentUser, blockedIdsList] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          friends: {
            select: { id: true },
          },
          friendsOf: {
            select: { id: true },
          },
        },
      }),
      loadBlockedIds(session.user.id),
    ])

    const outgoingIds = new Set((currentUser?.friends || []).map((friend) => friend.id))
    const incomingIds = new Set((currentUser?.friendsOf || []).map((friend) => friend.id))
    const blockedIds = new Set(blockedIdsList)

    const users = await prisma.user.findMany({
      where: {
        id: { not: session.user.id },
        OR: [
          { username: { contains: q, mode: "insensitive" } },
          { firstName: { contains: q, mode: "insensitive" } },
          { lastName: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        profilePicture: true,
      },
      orderBy: { createdAt: "desc" },
      take,
    })

    return NextResponse.json({
      users: users.map((user) => ({
        ...user,
        relationshipStatus: getRelationshipStatus(user.id, outgoingIds, incomingIds, blockedIds),
      })),
    })
  } catch (error) {
    console.error("Error searching users:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
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
