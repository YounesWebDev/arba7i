import Link from "next/link"
import { getRadarDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"

export default async function DashboardRadarPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getRadarDictionary(lang as Locale)

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{dict.title}</p>
      <Link href={`/${lang}/dashboard`} className="text-sm text-primary underline-offset-4 hover:underline">
        {dict.backToDashboard}
      </Link>
    </div>
  )
}
