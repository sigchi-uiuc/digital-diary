import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const baseAdapter = PrismaAdapter(prisma) as any

const normalizeUserData = (data: any) => {
  const email = typeof data?.email === "string" ? data.email : ""
  const username = typeof data?.username === "string" && data.username
    ? data.username
    : email.split("@")[0]
  const name = typeof data?.name === "string" ? data.name.trim() : ""
  const nameParts = name ? name.split(/\s+/) : []
  const firstName = nameParts.length ? nameParts[0] : null
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : null
  const profilePicture = typeof data?.image === "string" ? data.image : null
  const { name: _name, image: _image, ...rest } = data ?? {}
  return {
    ...rest,
    firstName,
    lastName,
    profilePicture,
    username,
  }
}

const sanitizeAccountData = (data: any) => {
  const { refresh_token_expires_in: _refreshTokenExpiresIn, ...rest } = data ?? {}
  return rest
}

const adapter = {
  ...baseAdapter,
  async createUser(data: any) {
    return baseAdapter.createUser(normalizeUserData(data))
  },
  async updateUser(data: any) {
    return baseAdapter.updateUser(normalizeUserData(data))
  },
  async linkAccount(data: any) {
    return baseAdapter.linkAccount(sanitizeAccountData(data))
  },
}

export const authOptions: NextAuthOptions = {
  adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar.readonly",
          access_type: "offline",
          prompt: "consent",
        },
      },
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user, account, profile, email }) {
      // If signing in with Google OAuth
      if (account?.provider === "google" && user.email) {
        // Check if a user with this email already exists (from credentials signup)
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        })
        
        if (existingUser) {
          // Link Google account to existing user and always refresh stored OAuth tokens
          const existingAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: "google",
                providerAccountId: account.providerAccountId,
              },
            },
          })
          
          if (!existingAccount) {
            // Create account link
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              },
            })
          } else {
            await prisma.account.update({
              where: {
                provider_providerAccountId: {
                  provider: "google",
                  providerAccountId: account.providerAccountId,
                },
              },
              data: {
                userId: existingUser.id,
                type: account.type,
                access_token: account.access_token ?? existingAccount.access_token,
                refresh_token: account.refresh_token ?? existingAccount.refresh_token,
                expires_at: account.expires_at ?? existingAccount.expires_at,
                token_type: account.token_type ?? existingAccount.token_type,
                scope: account.scope ?? existingAccount.scope,
                id_token: account.id_token ?? existingAccount.id_token,
              },
            })
          }
          
          // Update user object to use existing user ID
          user.id = existingUser.id
          user.username = existingUser.username
          user.firstName = existingUser.firstName
          user.lastName = existingUser.lastName
          user.profilePicture = existingUser.profilePicture
        }
      }
      return true
    },
    async jwt({ token, user, account, trigger }) {
      // Initial sign in
      if (user) {
        token.sub = user.id
        token.username = (user as any).username || ""
        token.firstName = (user as any).firstName || null
        token.lastName = (user as any).lastName || null
        token.profilePicture = (user as any).profilePicture || null
      }
      
      // If session is being updated, fetch fresh user data from database
      if (trigger === "update" && token.sub) {
        try {
          const freshUser = await prisma.user.findUnique({
            where: { id: token.sub },
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              profilePicture: true,
              email: true,
            }
          })
          
          if (freshUser) {
            token.username = freshUser.username
            token.firstName = freshUser.firstName
            token.lastName = freshUser.lastName
            token.profilePicture = freshUser.profilePicture
          }
        } catch (error) {
          console.error("Error fetching fresh user data:", error)
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.username = token.username as string
        session.user.firstName = token.firstName as string | null
        session.user.lastName = token.lastName as string | null
        session.user.profilePicture = token.profilePicture as string | null
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin"
  },
  events: {
    async signIn({ user }) {
      // Ensure user has a username on first Google sign-in
      if (user.email && !user.username) {
        const username = user.email.split('@')[0]
        await prisma.user.update({
          where: { email: user.email },
          data: { username: username }
        })
      }
    }
  }
}
