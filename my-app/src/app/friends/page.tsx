import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getFriends, getFriendEntries } from "@/lib/actions/friends"
import FriendsPageClient from "@/components/FriendsPageClient"

export default async function FriendsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth/signin")

  const [friendsData, friendEntries] = await Promise.all([
    getFriends(),
    getFriendEntries(),
  ])

  return (
    <FriendsPageClient
      initialData={friendsData}
      initialFriendEntries={friendEntries}
    />
  )
}
