import Link from "next/link"
import { Home, LayoutDashboard, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function NotFoundPage({
  params,
}: {
  params?: Promise<{ lang?: string }>
}) {
  const resolvedParams = await params
  const lang = resolvedParams?.lang ?? "en"
  const isArabic = lang === "ar"

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-4 py-10">
      <Card className="w-full border-border/60 bg-card/95 shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <SearchX className="h-7 w-7" />
          </div>
          <CardTitle>
            {isArabic ? "الصفحة غير موجودة" : "Page not found"}
          </CardTitle>
          <CardDescription>
            {isArabic
              ? "الصفحة اللي طلبتها غير موجودة أو ما زالت ما تبناتش."
              : "The page you requested does not exist yet or has not been built."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="outline">
            <Link href={`/${lang}`}>
              <Home className="h-4 w-4" />
              <span>{isArabic ? "الرجوع للرئيسية" : "Back to home"}</span>
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/${lang}/dashboard`}>
              <LayoutDashboard className="h-4 w-4" />
              <span>{isArabic ? "الرجوع للداشبورد" : "Back to dashboard"}</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
