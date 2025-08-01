"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { DollarSign, TrendingUp } from "lucide-react"

// Mock data for revenue trend over the last 6 months
const revenueData = [
  { month: "Jul", revenue: 18500, growth: 0 },
  { month: "Aug", revenue: 19200, growth: 3.8 },
  { month: "Sep", revenue: 20800, growth: 8.3 },
  { month: "Oct", revenue: 22100, growth: 6.3 },
  { month: "Nov", revenue: 23400, growth: 5.9 },
  { month: "Dec", revenue: 24847, growth: 6.2 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
}

export function RevenueTrendChart() {
  const totalGrowth = (
    ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) / revenueData[0].revenue) *
    100
  ).toFixed(1)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Revenue Trend
        </CardTitle>
        <CardDescription>Monthly recurring revenue growth over 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Key Metrics */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-2xl font-bold">${revenueData[revenueData.length - 1].revenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Current MRR</p>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+{totalGrowth}%</span>
              </div>
            </div>
          </div>

          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <ChartTooltip
                  content={<ChartTooltipContent formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Growth indicators */}
          <div className="grid grid-cols-6 gap-2 text-center">
            {revenueData.map((data, index) => (
              <div key={index} className="space-y-1">
                <p className="text-xs font-medium">{data.month}</p>
                <p className="text-xs text-muted-foreground">
                  {data.growth > 0 ? `+${data.growth}%` : data.growth === 0 ? "—" : `${data.growth}%`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
