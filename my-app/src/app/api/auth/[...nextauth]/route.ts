import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"
import type { NextRequest } from "next/server"

const handler = NextAuth(authOptions)

type Context = { params: Promise<{ nextauth: string[] }> }

async function GET(req: NextRequest, ctx: Context) {
  return handler(req, { params: await ctx.params })
}

async function POST(req: NextRequest, ctx: Context) {
  return handler(req, { params: await ctx.params })
}

export { GET, POST }
