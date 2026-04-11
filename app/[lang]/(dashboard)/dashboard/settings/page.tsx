import Link from "next/link"

export default async function DashboardSettingsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">Settings Page</p>
      <Link href={`/${lang}/dashboard`} className="text-sm text-primary underline-offset-4 hover:underline">
        Back to dashboard
      </Link>
    </div>
  )
}
