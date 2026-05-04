import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardNewOrderPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8">
      <Card className="max-w-md">
        <CardHeader className="text-center">
          <CardTitle>New Order Page</CardTitle>
          <CardDescription>Order creation is not wired into the dashboard flow yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href={`/${lang}/dashboard`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
