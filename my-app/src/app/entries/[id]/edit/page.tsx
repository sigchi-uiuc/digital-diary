import { notFound, redirect } from "next/navigation"
import { getAppSession } from "@/lib/auth"
import { getEntry } from "@/lib/actions/entries"
import EditEntryForm from "@/components/EditEntryForm"

export default async function EditEntryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getAppSession()
  if (!session) redirect("/auth/signin")

  const { id } = await params
  const entry = await getEntry(id)

  if (!entry) notFound()

  return <EditEntryForm entry={entry} />
}
