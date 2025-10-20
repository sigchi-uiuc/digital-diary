import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET /api/entries/[id] - Get a specific entry
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const entry = await prisma.entry.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      },
      include: {
        entryLocations: true
      }
    })

    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    }

    return NextResponse.json(entry)
  } catch (error) {
    console.error("Error fetching entry:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT /api/entries/[id] - Update an entry
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, visibility, qualityEmoji, mediaUrls, locations } = await request.json()

    const existingEntry = await prisma.entry.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if (!existingEntry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    }

    const entry = await prisma.entry.update({
      where: { id: params.id },
      data: {
        content,
        visibility,
        qualityEmoji,
        mediaUrls,
        locations: locations || null
      },
      include: {
        entryLocations: true
      }
    })

    return NextResponse.json(entry)
  } catch (error) {
    console.error("Error updating entry:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE /api/entries/[id] - Delete an entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const existingEntry = await prisma.entry.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if (!existingEntry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    }

    await prisma.entry.delete({
      where: { id: params.id }
    })

    // Update user entry counts
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        journalEntriesCount: { decrement: 1 },
        [existingEntry.visibility.toLowerCase() + "EntriesCount"]: { decrement: 1 }
      }
    })

    return NextResponse.json({ message: "Entry deleted successfully" })
  } catch (error) {
    console.error("Error deleting entry:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
