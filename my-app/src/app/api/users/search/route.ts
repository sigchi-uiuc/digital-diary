import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { PrismaClient } from "@prisma/client"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

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

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        friends: {
          select: { id: true },
        },
      },
    })

    const friendIds = new Set((currentUser?.friends || []).map((friend) => friend.id))

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
        isFriend: friendIds.has(user.id),
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
