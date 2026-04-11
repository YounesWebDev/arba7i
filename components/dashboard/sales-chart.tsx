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
  const [isMounted, setIsMounted] = React.useState(false)
  const [containerWidth, setContainerWidth] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    if (!isMounted || !containerRef.current) return

    const element = containerRef.current
    const updateWidth = () => {
      setContainerWidth(element.getBoundingClientRect().width)
    }

    updateWidth()

    const resizeObserver = new ResizeObserver(() => {
      updateWidth()
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [isMounted])

  if (!data || data.length === 0) {
    return (
      <div className="flex h-[220px] items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 text-sm text-muted-foreground sm:h-[260px]">
        <span className="max-w-xs text-center">{emptyText}</span>
      </div>
    )
  }

  const peakRevenue = Math.max(...data.map((item) => item.revenue), 0)
  const canRenderChart = isMounted && containerWidth > 0

  return (
    <div
      ref={containerRef}
      className="h-[220px] w-full min-w-0 rounded-2xl sm:h-[260px]"
    >
      {canRenderChart ? (
        <ChartContainer
          config={chartConfig}
          className={cn(
            "h-full w-full min-w-0 min-h-[220px] rounded-2xl sm:min-h-[260px]",
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
      ) : (
        <div className="h-full w-full rounded-2xl border border-border/60 bg-muted/10" />
      )}
    </div>
  )
}
