"use client"

import * as React from "react"
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
      color: "var(--primary)",
    },
  } satisfies ChartConfig

  if (!data || data.length === 0) {
    return (
      <div className="flex h-[220px] items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 text-sm text-muted-foreground sm:h-[260px]">
        <span className="max-w-xs text-center">{emptyText}</span>
      </div>
    )
  }

  const peakRevenue = Math.max(...data.map((item) => item.revenue), 0)

  return (
    <ChartContainer
      config={chartConfig}
      className={cn(
        "h-[220px] w-full min-w-0 min-h-[220px] rounded-2xl sm:h-[260px] sm:min-h-[260px]",
        "[&_.recharts-cartesian-grid-horizontal_line]:stroke-border/60",
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
        "[&_.recharts-cartesian-axis-tick_text]:text-[10px] sm:[&_.recharts-cartesian-axis-tick_text]:text-xs",
        "[&_.recharts-bar-rectangle]:outline-hidden"
      )}
    >
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ top: 8, right: 0, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="sales-bar-gradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="sales-bar-gradient-peak" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
            <stop offset="55%" stopColor="var(--primary)" stopOpacity={1} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="4 4" />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={8}
          axisLine={false}
          fontSize={10}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          fontSize={10}
          width={40}
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
          maxBarSize={32}
        >
          {data.map((item, index) => {
            const isPeak = item.revenue === peakRevenue && peakRevenue > 0

            return (
              <Cell
                key={`${item.name}-${index}`}
                fill={isPeak ? "url(#sales-bar-gradient-peak)" : "url(#sales-bar-gradient)"}
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
