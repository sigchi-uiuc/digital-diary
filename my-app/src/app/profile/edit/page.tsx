import { redirect } from "next/navigation"
import { getAppSession } from "@/lib/auth"
import { getProfile } from "@/lib/actions/profile"
import EditProfileForm from "@/components/EditProfileForm"

export default async function ProfileEditPage() {
  const session = await getAppSession()
  if (!session) redirect("/auth/signin")

  const profile = await getProfile()

  return <EditProfileForm initialProfile={profile} />
}
