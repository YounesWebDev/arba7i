import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PublicLoading() {
  return (
    <div className="overflow-x-hidden bg-background pb-20">
      <section className="px-6 pb-20 pt-32 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-7xl space-y-8 text-center">
          <div className="flex justify-center">
            <Skeleton className="h-8 w-32 rounded-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="mx-auto h-16 w-full max-w-4xl rounded-3xl" />
            <Skeleton className="mx-auto h-16 w-3/4 max-w-3xl rounded-3xl" />
          </div>
          <Skeleton className="mx-auto h-5 w-full max-w-2xl" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-40 rounded-2xl" />
            <Skeleton className="h-12 w-40 rounded-2xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={`public-skeleton-${index}`} className="border-border/20 bg-card">
              <CardContent className="space-y-4 p-8">
                <Skeleton className="h-12 w-12 rounded-2xl" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
