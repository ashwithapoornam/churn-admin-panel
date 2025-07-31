"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart } from "lucide-react"

// Mock data for plan distribution - only Basic and Premium plans
const planData = [
  { name: "Premium Plan", value: 65, color: "bg-blue-500", users: 1850 },
  { name: "Basic Plan", value: 35, color: "bg-green-500", users: 997 },
]

export function PlanDistributionChart() {
  const totalUsers = planData.reduce((sum, plan) => sum + plan.users, 0)

  // Calculate the circumference for the donut chart
  const radius = 80
  const circumference = 2 * Math.PI * radius

  let cumulativePercentage = 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Plan Distribution
        </CardTitle>
        <CardDescription>Current subscription plan breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg width="200" height="200" className="transform -rotate-90">
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="20"
                className="text-muted/20"
              />
              {planData.map((plan, index) => {
                const strokeDasharray = `${(plan.value / 100) * circumference} ${circumference}`
                const strokeDashoffset = (-cumulativePercentage * circumference) / 100
                cumulativePercentage += plan.value

                return (
                  <circle
                    key={plan.name}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    strokeWidth="20"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className={`${plan.color.replace("bg-", "stroke-")} transition-all duration-300`}
                    style={{
                      stroke:
                        plan.color === "bg-blue-500"
                          ? "#3b82f6"
                          : plan.color === "bg-green-500"
                            ? "#10b981"
                            : "#6b7280",
                    }}
                  />
                )
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {planData.map((plan) => (
            <div key={plan.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${plan.color}`} />
                <span className="text-sm font-medium">{plan.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{plan.users.toLocaleString()} users</span>
                <span className="text-sm font-medium">{plan.value}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Most Popular:</span>
            <span className="font-medium">Premium Plan (65%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
