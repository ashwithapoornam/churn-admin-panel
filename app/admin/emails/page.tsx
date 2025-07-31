"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"

const emailSettings = [
  {
    id: "onboarding",
    name: "Onboarding Emails",
    description: "Welcome emails for new users",
    enabled: true,
  },
  {
    id: "password_reset",
    name: "Password Reset Emails",
    description: "Password reset confirmation emails",
    enabled: true,
  },
  {
    id: "invitations",
    name: "Team Invitations",
    description: "Email invitations for team members",
    enabled: true,
  },
  {
    id: "notifications",
    name: "System Notifications",
    description: "Important system updates and alerts",
    enabled: false,
  },
]

const emailLogs = [
  {
    id: "1",
    recipient: "john@example.com",
    subject: "Welcome to ChurnPredict",
    type: "onboarding",
    status: "delivered",
    timestamp: "2024-01-15 14:30:25",
    attempts: 1,
  },
  {
    id: "2",
    recipient: "jane@example.com",
    subject: "Password Reset Request",
    type: "password_reset",
    status: "delivered",
    timestamp: "2024-01-15 14:25:12",
    attempts: 1,
  },
  {
    id: "3",
    recipient: "mike@example.com",
    subject: "Team Invitation - Acme Corp",
    type: "invitation",
    status: "failed",
    timestamp: "2024-01-15 14:20:45",
    attempts: 3,
  },
  {
    id: "4",
    recipient: "sarah@example.com",
    subject: "System Maintenance Notice",
    type: "notification",
    status: "bounced",
    timestamp: "2024-01-15 14:15:33",
    attempts: 2,
  },
]

export default function EmailManagement() {
  const [settings, setSettings] = useState(emailSettings)

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "bounced":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "failed":
        return "destructive"
      case "bounced":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "outline"
    }
  }

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
                <BreadcrumbPage>Email Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Email Management</h1>
            <p className="text-muted-foreground">Configure automated emails and monitor delivery status</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Enable or disable automated email types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">{setting.name}</Label>
                    <div className="text-sm text-muted-foreground">{setting.description}</div>
                  </div>
                  <Switch checked={setting.enabled} onCheckedChange={() => toggleSetting(setting.id)} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invitation Template</CardTitle>
              <CardDescription>Customize team invitation email template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  placeholder="You're invited to join {team_name}"
                  defaultValue="You're invited to join {team_name}"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your invitation message..."
                  defaultValue="Hi there! You've been invited to join {team_name} on ChurnPredict. Click the link below to accept your invitation and get started."
                  rows={4}
                />
              </div>
              <Button>Save Template</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Email Delivery Logs</CardTitle>
            <CardDescription>Monitor email delivery status and troubleshoot issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.recipient}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{log.subject}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <Badge variant={getStatusVariant(log.status) as any}>{log.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{log.attempts}</TableCell>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
