import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      username: string
      firstName?: string | null
      lastName?: string | null
      profilePicture?: string | null
      name?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    email: string
    username: string
    firstName?: string | null
    lastName?: string | null
    profilePicture?: string | null
    name?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string
    firstName?: string | null
    lastName?: string | null
    profilePicture?: string | null
  }
}
