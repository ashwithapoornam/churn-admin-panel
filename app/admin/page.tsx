"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Building2, CreditCard, Database, Activity, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"
import { UserGrowthChart } from "@/components/charts/user-growth-chart"
import { PlanDistributionChart } from "@/components/charts/plan-distribution-chart"
import { RevenueTrendChart } from "@/components/charts/revenue-trend-chart"

const quickStats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Active Teams",
    value: "156",
    change: "+8.2%",
    changeType: "positive",
    icon: Building2,
  },
  {
    title: "Monthly Revenue",
    value: "$24,847",
    change: "+18.7%",
    changeType: "positive",
    icon: CreditCard,
  },
  {
    title: "API Calls",
    value: "847K",
    change: "+23.1%",
    changeType: "positive",
    icon: Activity,
  },
]

const recentActivity = [
  {
    id: "1",
    action: "New user registered",
    user: "john@example.com",
    timestamp: "2 minutes ago",
    type: "user",
  },
  {
    id: "2",
    action: "Team created",
    user: "sarah@example.com",
    timestamp: "5 minutes ago",
    type: "team",
  },
  {
    id: "3",
    action: "Subscription upgraded",
    user: "mike@example.com",
    timestamp: "12 minutes ago",
    type: "billing",
  },
  {
    id: "4",
    action: "Data connector synced",
    user: "System",
    timestamp: "18 minutes ago",
    type: "system",
  },
]

const systemHealth = [
  {
    name: "API Status",
    status: "operational",
    uptime: "99.9%",
  },
  {
    name: "Database",
    status: "operational",
    uptime: "99.8%",
  },
  {
    name: "Email Service",
    status: "degraded",
    uptime: "98.2%",
  },
  {
    name: "Data Connectors",
    status: "operational",
    uptime: "99.5%",
  },
]

export default function AdminOverview() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Admin Panel</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your platform today.</p>
          </div>
          <Button>View Full Analytics</Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions and events across your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {activity.type === "user" && <Users className="h-4 w-4" />}
                      {activity.type === "team" && <Building2 className="h-4 w-4" />}
                      {activity.type === "billing" && <CreditCard className="h-4 w-4" />}
                      {activity.type === "system" && <Database className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.user}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.timestamp}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Current status of platform services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((service) => (
                  <div key={service.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {service.status === "operational" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-sm font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={service.status === "operational" ? "default" : "secondary"} className="text-xs">
                        {service.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{service.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <UserGrowthChart />
          <PlanDistributionChart />
          <RevenueTrendChart />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-base">User Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Manage users, roles, and permissions</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-green-500" />
                <CardTitle className="text-base">Teams & Projects</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Organize teams and manage projects</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-base">Billing</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Monitor subscriptions and revenue</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <CardTitle className="text-base">Analytics</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">View detailed platform analytics</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
