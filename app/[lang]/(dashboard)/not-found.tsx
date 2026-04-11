import Link from "next/link"
import { ArrowLeft, LayoutDashboard, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardNotFoundPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const isArabic = lang === "ar"

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center py-8">
      <Card className="w-full border-border/60 bg-card/95 shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <SearchX className="h-7 w-7" />
          </div>
          <CardTitle>
            {isArabic ? "هذه صفحة غير موجودة في الداشبورد" : "This dashboard page does not exist"}
          </CardTitle>
          <CardDescription>
            {isArabic
              ? "إذا كانت الصفحة مثل الرادار أو التحليلات، فهي غالبًا غير مبنية بعد."
              : "If this was a page like Radar or Analytics, it likely has not been built yet."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link href={`/${lang}/dashboard`}>
              <LayoutDashboard className="h-4 w-4" />
              <span>{isArabic ? "ارجع للداشبورد" : "Go to dashboard"}</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
