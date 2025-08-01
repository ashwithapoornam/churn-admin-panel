"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

export function RevenueTrendChart() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue))
  const minRevenue = Math.min(...revenueData.map((d) => d.revenue))
  const range = maxRevenue - minRevenue
  const totalGrowth = (
    ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) / revenueData[0].revenue) *
    100
  ).toFixed(1)

  const chartHeight = 200
  const chartPadding = 40

  // Calculate points for the line
  const points = revenueData.map((data, index) => {
    const x = chartPadding + (index / (revenueData.length - 1)) * (100 - chartPadding * 2)
    const y = chartPadding + ((maxRevenue - data.revenue) / range) * (chartHeight - chartPadding * 2)
    return { x, y, revenue: data.revenue, month: data.month, growth: data.growth }
  })

  // Create path string for the line
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x}% ${point.y}`).join(" ")

  // Create path string for the area (including bottom)
  const areaPath = `${linePath} L ${points[points.length - 1].x}% ${chartHeight - chartPadding} L ${points[0].x}% ${chartHeight - chartPadding} Z`

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

          <div className="relative h-[240px] w-full">
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 100 ${chartHeight}`}
              preserveAspectRatio="xMidYMid meet"
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.02" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((percent) => (
                <line
                  key={percent}
                  x1={`${chartPadding}%`}
                  y1={chartPadding + (percent / 100) * (chartHeight - chartPadding * 2)}
                  x2={`${100 - chartPadding}%`}
                  y2={chartPadding + (percent / 100) * (chartHeight - chartPadding * 2)}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-muted-foreground/10"
                />
              ))}

              {/* Y-axis labels */}
              {[0, 25, 50, 75, 100].map((percent) => {
                const value = maxRevenue - (percent / 100) * range
                return (
                  <text
                    key={percent}
                    x={`${chartPadding - 5}%`}
                    y={chartPadding + (percent / 100) * (chartHeight - chartPadding * 2)}
                    textAnchor="end"
                    dominantBaseline="middle"
                    className="text-xs fill-muted-foreground"
                  >
                    ${(value / 1000).toFixed(0)}k
                  </text>
                )
              })}

              {/* Area fill */}
              <path d={areaPath} fill="url(#revenueGradient)" />

              {/* Line */}
              <path
                d={linePath}
                fill="none"
                stroke="rgb(34, 197, 94)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />

              {/* Data points */}
              {points.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={`${point.x}%`}
                    cy={point.y}
                    r="5"
                    fill="rgb(34, 197, 94)"
                    stroke="white"
                    strokeWidth="2"
                    className="drop-shadow-sm"
                  />
                  {/* Hover tooltip */}
                  <g className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <rect
                      x={`${point.x - 8}%`}
                      y={point.y - 35}
                      width="60"
                      height="25"
                      rx="4"
                      fill="rgb(15, 23, 42)"
                      stroke="rgb(34, 197, 94)"
                      strokeWidth="1"
                    />
                    <text
                      x={`${point.x}%`}
                      y={point.y - 20}
                      textAnchor="middle"
                      className="text-xs fill-white font-medium"
                    >
                      ${(point.revenue / 1000).toFixed(1)}k
                    </text>
                  </g>
                </g>
              ))}

              {/* Month labels */}
              {points.map((point, index) => (
                <text
                  key={index}
                  x={`${point.x}%`}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  className="text-xs fill-muted-foreground"
                >
                  {point.month}
                </text>
              ))}
            </svg>
          </div>

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
