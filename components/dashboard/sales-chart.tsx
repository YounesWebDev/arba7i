"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

export function SalesChart({
  data,
  emptyText = "No sales data available yet.",
  revenueLabel = "Revenue (DZD)",
}: {
  data: { name: string; revenue: number }[]
  emptyText?: string
  revenueLabel?: string
}) {
  const chartConfig = {
    revenue: {
      label: revenueLabel,
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig

  if (!data || data.length === 0) {
    return (
      <div className="flex h-[260px] items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 text-sm text-muted-foreground">
        <span className="max-w-xs text-center">{emptyText}</span>
      </div>
    )
  }

  const peakRevenue = Math.max(...data.map((item) => item.revenue), 0)

  return (
    <ChartContainer
      config={chartConfig}
      className={cn(
        "h-[260px] w-full rounded-2xl",
        "[&_.recharts-cartesian-grid-horizontal_line]:stroke-border/60",
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
        "[&_.recharts-bar-rectangle]:outline-hidden"
      )}
    >
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ top: 12, right: 4, left: -8, bottom: 0 }}
      >
        <defs>
          <linearGradient id="sales-bar-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.95} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="4 4" />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={12}
          axisLine={false}
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          fontSize={12}
          width={56}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="dot"
              className="rounded-xl border-border/60 bg-popover/95 shadow-lg backdrop-blur-sm"
            />
          }
        />
        <Bar
          dataKey="revenue"
          fill="url(#sales-bar-gradient)"
          radius={[10, 10, 4, 4]}
          maxBarSize={42}
        >
          {data.map((item, index) => {
            const isPeak = item.revenue === peakRevenue && peakRevenue > 0

            return (
              <Cell
                key={`${item.name}-${index}`}
                fill={isPeak ? "hsl(var(--primary))" : "url(#sales-bar-gradient)"}
                className={cn(
                  "transition-opacity duration-200",
                  isPeak ? "opacity-100" : "opacity-90"
                )}
              />
            )
          })}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
