import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getProfile } from "@/lib/actions/profile"
import EditProfileForm from "@/components/EditProfileForm"

export default async function ProfileEditPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth/signin")

  const profile = await getProfile()

  return <EditProfileForm initialProfile={profile} />
}
