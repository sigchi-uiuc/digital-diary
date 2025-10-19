import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      username: string
      name?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    email: string
    username: string
    name?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string
  }
}
