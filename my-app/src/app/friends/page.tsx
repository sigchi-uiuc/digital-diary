import { redirect } from "next/navigation"
import { getAppSession } from "@/lib/auth"
import { getFriends, getFriendEntries } from "@/lib/actions/friends"
import FriendsPageClient from "@/components/FriendsPageClient"

export default async function FriendsPage() {
  const session = await getAppSession()
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
