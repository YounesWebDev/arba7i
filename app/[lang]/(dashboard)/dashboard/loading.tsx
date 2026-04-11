import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-8">
      <Card className="overflow-hidden border-border/60 bg-card/95 shadow-sm">
        <CardContent className="space-y-4 p-6">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-32" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={`quick-${index}`} className="border-border/60 bg-card/95 shadow-sm">
            <CardContent className="space-y-3 p-5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={`metric-${index}`} className="border-border/60 bg-card/95 shadow-sm">
            <CardHeader className="space-y-3 pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7 lg:gap-8">
        <div className="space-y-8 md:col-span-4 lg:col-span-5">
          <Card className="border-border/60 bg-card/95 shadow-sm">
            <CardHeader className="space-y-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-44" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[260px] w-full rounded-2xl" />
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/95 shadow-sm">
            <CardHeader className="space-y-3">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={`table-${index}`} className="h-12 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 md:col-span-3 lg:col-span-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={`panel-${index}`} className="border-border/60 bg-card/95 shadow-sm">
              <CardHeader className="space-y-3">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-40" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
