import Link from "next/link"
import { CircleX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function StoreNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-10 sm:px-6">
      <Card className="w-full max-w-xl border-border/60 bg-card text-center shadow-sm">
        <CardContent className="space-y-5 p-8 sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <CircleX className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight">Store not found</h1>
            <p className="text-sm text-muted-foreground">
              The storefront you requested does not exist, is inactive, or is no longer publicly available.
            </p>
          </div>
          <Button className="rounded-full" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
