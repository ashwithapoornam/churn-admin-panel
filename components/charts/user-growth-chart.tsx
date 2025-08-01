"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, UserMinus } from "lucide-react"

// Mock data for user growth and churn over the last 6 months
const userGrowthData = [
  { month: "Jul", totalUsers: 1200, newUsers: 150, churnedUsers: 45, netGrowth: 105 },
  { month: "Aug", totalUsers: 1450, newUsers: 280, churnedUsers: 30, netGrowth: 250 },
  { month: "Sep", totalUsers: 1680, newUsers: 260, churnedUsers: 30, netGrowth: 230 },
  { month: "Oct", totalUsers: 1920, newUsers: 280, churnedUsers: 40, netGrowth: 240 },
  { month: "Nov", totalUsers: 2340, newUsers: 450, churnedUsers: 30, netGrowth: 420 },
  { month: "Dec", totalUsers: 2847, newUsers: 540, churnedUsers: 33, netGrowth: 507 },
]

const chartConfig = {
  totalUsers: {
    label: "Total Users",
    color: "hsl(var(--chart-1))",
  },
  newUsers: {
    label: "New Users",
    color: "hsl(var(--chart-2))",
  },
  churnedUsers: {
    label: "Churned Users",
    color: "hsl(var(--chart-3))",
  },
}

export function UserGrowthChart() {
  const totalGrowth = (
    ((userGrowthData[userGrowthData.length - 1].totalUsers - userGrowthData[0].totalUsers) /
      userGrowthData[0].totalUsers) *
    100
  ).toFixed(1)

  const avgChurnRate = (
    userGrowthData.reduce((sum, data) => sum + (data.churnedUsers / data.totalUsers) * 100, 0) / userGrowthData.length
  ).toFixed(1)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          User Growth & Churn
        </CardTitle>
        <CardDescription>Monthly user acquisition and churn trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-lg font-bold">
                  {userGrowthData[userGrowthData.length - 1].totalUsers.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-lg font-bold">+{totalGrowth}%</span>
              </div>
              <p className="text-xs text-muted-foreground">Growth Rate</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1 text-red-500">
                <UserMinus className="h-4 w-4" />
                <span className="text-lg font-bold">{avgChurnRate}%</span>
              </div>
              <p className="text-xs text-muted-foreground">Avg Churn Rate</p>
            </div>
          </div>

          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="newUsers"
                  stroke="var(--color-newUsers)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-newUsers)", strokeWidth: 2, r: 3 }}
                  name="New Users"
                />
                <Line
                  type="monotone"
                  dataKey="churnedUsers"
                  stroke="var(--color-churnedUsers)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-churnedUsers)", strokeWidth: 2, r: 3 }}
                  name="Churned Users"
                />
                <Line
                  type="monotone"
                  dataKey="totalUsers"
                  stroke="var(--color-totalUsers)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-totalUsers)", strokeWidth: 2, r: 4 }}
                  name="Total Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Monthly breakdown */}
          <div className="grid grid-cols-6 gap-2 text-center text-xs">
            {userGrowthData.map((data, index) => (
              <div key={index} className="space-y-1">
                <p className="font-medium">{data.month}</p>
                <div className="space-y-0.5">
                  <p className="text-green-600">+{data.newUsers}</p>
                  <p className="text-red-500">-{data.churnedUsers}</p>
                  <p className="text-muted-foreground font-medium">={data.netGrowth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
