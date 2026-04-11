import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AuthLoading() {
  return (
    <div className="min-h-[calc(100dvh-4.5rem)] bg-background px-4 py-6 sm:px-6 lg:min-h-[calc(100dvh-5rem)]">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <section className="flex items-start justify-center lg:items-center">
          <div className="w-full max-w-xl">
            <Card className="border-border/70 bg-card/95 shadow-xl shadow-primary/10">
              <CardContent className="space-y-6 p-6 md:p-8">
                <div className="space-y-4 text-center">
                  <Skeleton className="mx-auto h-18 w-18 rounded-2xl" />
                  <Skeleton className="mx-auto h-8 w-40 rounded-full" />
                  <Skeleton className="mx-auto h-10 w-72" />
                </div>

                <div className="space-y-4">
                  <Skeleton className="h-14 w-full rounded-full" />
                  <Skeleton className="h-14 w-full rounded-full" />
                  <Skeleton className="h-14 w-full rounded-full" />
                  <Skeleton className="h-14 w-full rounded-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <aside className="hidden lg:block">
          <div className="h-full rounded-tr-4xl rounded-br-4xl bg-gradient-to-br from-primary to-accent p-10">
            <div className="mx-auto max-w-sm space-y-6 text-center">
              <Skeleton className="mx-auto h-20 w-20 rounded-xl bg-white/20" />
              <Skeleton className="mx-auto h-12 w-64 bg-white/20" />
              <Skeleton className="mx-auto h-4 w-full bg-white/20" />
              <Skeleton className="mx-auto h-4 w-5/6 bg-white/20" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
