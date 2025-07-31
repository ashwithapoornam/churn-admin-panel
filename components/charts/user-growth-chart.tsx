"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

// Mock data for user growth over the last 6 months
const userGrowthData = [
  { month: "Jul", users: 1200 },
  { month: "Aug", users: 1450 },
  { month: "Sep", users: 1680 },
  { month: "Oct", users: 1920 },
  { month: "Nov", users: 2340 },
  { month: "Dec", users: 2847 },
]

export function UserGrowthChart() {
  const maxUsers = Math.max(...userGrowthData.map((d) => d.users))
  const minUsers = Math.min(...userGrowthData.map((d) => d.users))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          User Growth
        </CardTitle>
        <CardDescription>Total users over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart Container */}
          <div className="h-[200px] flex items-end justify-between gap-2 px-2">
            {userGrowthData.map((data, index) => {
              const percentage = ((data.users - minUsers) / (maxUsers - minUsers)) * 100
              const height = Math.max(percentage * 1.6, 20) // Ensure minimum height of 20px
              const isLatest = index === userGrowthData.length - 1

              return (
                <div key={data.month} className="flex flex-col items-center flex-1 group">
                  {/* Value label */}
                  <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="text-xs font-medium text-foreground bg-popover border rounded px-2 py-1 shadow-sm">
                      {data.users.toLocaleString()}
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="relative flex-1 flex items-end w-full">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer ${
                        isLatest
                          ? "bg-gradient-to-t from-blue-600 to-blue-500"
                          : "bg-gradient-to-t from-blue-500 to-blue-400"
                      }`}
                      style={{
                        height: `${height}px`,
                        minHeight: "20px",
                      }}
                    />
                  </div>

                  {/* Month label */}
                  <div className="mt-2 text-xs font-medium text-muted-foreground">{data.month}</div>
                </div>
              )
            })}
          </div>

          {/* Chart Info */}
          <div className="flex items-center justify-between text-sm pt-2 border-t">
            <div className="text-muted-foreground">
              Growth: <span className="text-green-600 font-medium">+37.2%</span> over 6 months
            </div>
            <div className="text-muted-foreground">
              Latest:{" "}
              <span className="font-medium">{userGrowthData[userGrowthData.length - 1].users.toLocaleString()}</span>{" "}
              users
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
