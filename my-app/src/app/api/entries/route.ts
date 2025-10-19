import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET /api/entries - Get all entries for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const entries = await prisma.entry.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        entryLocations: true
      }
    })

    return NextResponse.json(entries)
  } catch (error) {
    console.error("Error fetching entries:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/entries - Create a new entry
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { type, content, visibility = "PRIVATE", qualityScore, qualityEmoji, mediaUrls = [], locations } = await request.json()

    if (!type || !content) {
      return NextResponse.json(
        { error: "Type and content are required" },
        { status: 400 }
      )
    }

    const entry = await prisma.entry.create({
      data: {
        userId: session.user.id,
        type,
        content,
        visibility,
        qualityScore,
        qualityEmoji,
        mediaUrls,
        locations: locations || null
      },
      include: {
        entryLocations: true
      }
    })

    // Update user entry counts
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        journalEntriesCount: { increment: 1 },
        [visibility.toLowerCase() + "EntriesCount"]: { increment: 1 }
      }
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error("Error creating entry:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
