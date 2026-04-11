import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CategoriesLoading() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <section className="flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-gradient-to-br from-card via-card to-primary/5 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-7 w-28 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-56" />
            <Skeleton className="h-5 w-80 max-w-full" />
          </div>
        </div>
        <Skeleton className="h-9 w-36 rounded-2xl" />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-border/60 bg-card/95 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-12 rounded-lg" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-36" />
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="overflow-hidden border-border/60 bg-card/95 shadow-sm">
        <CardHeader className="gap-4 border-b border-border/60 bg-muted/20 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-44" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24 rounded-2xl" />
            <Skeleton className="h-8 w-24 rounded-2xl" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4 px-6 py-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="grid grid-cols-[1.5fr_0.7fr_0.8fr_1fr_0.4fr] items-center gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-9 w-9 justify-self-end rounded-2xl" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
