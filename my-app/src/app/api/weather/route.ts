import { NextRequest, NextResponse } from "next/server"
import { getAppSession } from "@/lib/auth"
import { fetchWeatherFromCoordinates } from "@/lib/weather"
import { rateLimit, DEFAULT_API_RATE_LIMIT } from "@/lib/rateLimit"

export async function GET(request: NextRequest) {
  try {
    const session = await getAppSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const rl = rateLimit(`weather:${session.user.id}`, DEFAULT_API_RATE_LIMIT)
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too Many Requests" },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
      )
    }

    const { searchParams } = new URL(request.url)
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")

    if (!lat || !lng) {
      return NextResponse.json(
        { error: "Latitude and longitude are required" },
        { status: 400 }
      )
    }

    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)

    if (isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json(
        { error: "Invalid latitude or longitude" },
        { status: 400 }
      )
    }

    const weather = await fetchWeatherFromCoordinates(latitude, longitude)

    if (!weather) {
      return NextResponse.json(
        { error: "Failed to fetch weather data" },
        { status: 500 }
      )
    }

    return NextResponse.json({ weather })
  } catch (error: any) {
    console.error("Error fetching weather:", error)
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    )
  }
}

