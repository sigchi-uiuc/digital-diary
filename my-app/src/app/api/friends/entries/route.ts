import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { PrismaClient } from "@prisma/client"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Get mutual friends (both directions of the friend relation)
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

    if (mutualFriendIds.length === 0) {
      return NextResponse.json({ entries: [] })
    }

    // Exclude blocked users
    const blockedRows = await prisma.$queryRaw<{ blockedId: string }[]>`
      SELECT "blockedId" FROM "BlockedUser" WHERE "blockerId" = ${userId}
    `.catch(() => [] as { blockedId: string }[])

    const blockedIds = new Set(blockedRows.map((r) => r.blockedId))
    const visibleFriendIds = mutualFriendIds.filter((id) => !blockedIds.has(id))

    if (visibleFriendIds.length === 0) {
      return NextResponse.json({ entries: [] })
    }

    const entries = await prisma.entry.findMany({
      where: {
        userId: { in: visibleFriendIds },
        visibility: "PUBLIC",
      },
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

    return NextResponse.json({ entries })
  } catch (error) {
    console.error("Error fetching friend entries:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
