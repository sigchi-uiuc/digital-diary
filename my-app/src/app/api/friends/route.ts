import { NextRequest, NextResponse } from "next/server"
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

    const user = await prisma.user.findUnique({
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
      },
    })

    return NextResponse.json({ friends: user?.friends || [] })
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
      return NextResponse.json({ error: "You cannot add yourself" }, { status: 400 })
    }

    const [currentUser, targetUser] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, friends: { where: { id: targetUserId }, select: { id: true } } },
      }),
      prisma.user.findUnique({
        where: { id: targetUserId },
        select: { id: true },
      }),
    ])

    if (!currentUser || !targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (currentUser.friends.length > 0) {
      return NextResponse.json({ success: true, alreadyFriends: true })
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          friends: {
            connect: { id: targetUserId },
          },
        },
      }),
      prisma.user.update({
        where: { id: targetUserId },
        data: {
          friends: {
            connect: { id: session.user.id },
          },
        },
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding friend:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
