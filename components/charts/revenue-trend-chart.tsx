"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

// Mock data for revenue trend over the last 6 months
const revenueData = [
  { month: "Jul", revenue: 18500 },
  { month: "Aug", revenue: 19200 },
  { month: "Sep", revenue: 20800 },
  { month: "Oct", revenue: 22100 },
  { month: "Nov", revenue: 23400 },
  { month: "Dec", revenue: 24847 },
]

export function RevenueTrendChart() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue))
  const minRevenue = Math.min(...revenueData.map((d) => d.revenue))
  const range = maxRevenue - minRevenue

  const chartHeight = 160
  const chartPadding = 20

  // Calculate points for the line
  const points = revenueData.map((data, index) => {
    const x = (index / (revenueData.length - 1)) * 100
    const y = chartPadding + ((maxRevenue - data.revenue) / range) * chartHeight
    return { x, y, revenue: data.revenue }
  })

  // Create path string for the line
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x}% ${point.y}`).join(" ")

  // Create path string for the area (including bottom)
  const areaPath = `${linePath} L 100% ${chartHeight + chartPadding} L 0% ${chartHeight + chartPadding} Z`

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Revenue Trend
        </CardTitle>
        <CardDescription>Monthly recurring revenue over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative h-[200px] w-full">
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 100 ${chartHeight + chartPadding * 2}`}
              preserveAspectRatio="none"
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((percent) => (
                <line
                  key={percent}
                  x1="0%"
                  y1={chartPadding + (percent / 100) * chartHeight}
                  x2="100%"
                  y2={chartPadding + (percent / 100) * chartHeight}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-muted-foreground/20"
                />
              ))}

              {/* Area fill */}
              <path d={areaPath} fill="url(#revenueGradient)" className="drop-shadow-sm" />

              {/* Line */}
              <path
                d={linePath}
                fill="none"
                stroke="rgb(34, 197, 94)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-sm"
              />

              {/* Data points */}
              {points.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={`${point.x}%`}
                    cy={point.y}
                    r="4"
                    fill="rgb(34, 197, 94)"
                    stroke="white"
                    strokeWidth="2"
                    className="drop-shadow-sm hover:r-6 transition-all cursor-pointer"
                  />
                </g>
              ))}
            </svg>

            {/* Value labels on hover */}
            <div className="absolute inset-0 flex items-start justify-between pt-2">
              {revenueData.map((data, index) => {
                const point = points[index]
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    style={{
                      position: "absolute",
                      left: `${point.x}%`,
                      top: `${(point.y / (chartHeight + chartPadding * 2)) * 100}%`,
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <div className="bg-popover border rounded px-2 py-1 shadow-sm mb-1">
                      <span className="text-xs font-medium">${(data.revenue / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Month labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-2">
              {revenueData.map((data) => (
                <span key={data.month} className="text-center">
                  {data.month}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm pt-2 border-t">
            <div className="text-muted-foreground">
              Growth: <span className="text-green-600 font-medium">+34.3%</span> over 6 months
            </div>
            <div className="text-muted-foreground">
              Current:{" "}
              <span className="font-medium">${revenueData[revenueData.length - 1].revenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
