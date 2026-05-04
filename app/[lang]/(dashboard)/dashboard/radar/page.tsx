import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8">
      <Card className="max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{dict.title}</CardTitle>
          <CardDescription>{dict.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href={`/${lang}/dashboard`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {dict.backToDashboard}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
