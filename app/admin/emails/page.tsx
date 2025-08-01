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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Clock, AlertTriangle, Mail, TrendingUp, Send } from "lucide-react"

const emailTemplates = [
  {
    id: "welcome",
    name: "Welcome Email",
    description: "Sent to new users after registration",
    enabled: true,
    lastUsed: "2024-01-15",
    sentCount: 1247,
    template: {
      subject: "Your New Project is Live!",
      content: `Hello dreammakers,

🎉 Great news — your project, Bobcares, has been successfully created in Churn Probability Software.

Now it's time to onboard your customer data. Once your data is synced, you'll unlock full access to your project dashboard and churn insights.

Click below to track your setup progress:

[Track Project Button]

Depending on your current setup stage, you'll be taken to either the Dashboard or the Data Collection page.

Need a hand completing the setup? Our Support team is here to help — just reply to this email.

Best Regards,
Team Bobcares`,
    },
  },
  {
    id: "password_reset",
    name: "Password Reset",
    description: "Password reset confirmation emails",
    enabled: true,
    lastUsed: "2024-01-15",
    sentCount: 89,
    template: {
      subject: "Reset Your Password",
      content: "Click the link below to reset your password...",
    },
  },
  {
    id: "invitation",
    name: "Project Invitation",
    description: "Email invitations for project members",
    enabled: true,
    lastUsed: "2024-01-14",
    sentCount: 156,
    template: {
      subject: "You're invited to join {project_name}",
      content: "You've been invited to join a project...",
    },
  },
  {
    id: "notification",
    name: "System Notifications",
    description: "Important system updates and alerts",
    enabled: false,
    lastUsed: "2024-01-10",
    sentCount: 45,
    template: {
      subject: "System Update Notification",
      content: "Important system updates...",
    },
  },
]

const emailLogs = [
  {
    id: "1",
    recipient: "john@example.com",
    subject: "Welcome to ChurnPredict",
    type: "welcome",
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
    subject: "Project Invitation - Acme Corp",
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
  const [templates, setTemplates] = useState(emailTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const toggleTemplate = (id: string) => {
    setTemplates((prev) =>
      prev.map((template) => (template.id === id ? { ...template, enabled: !template.enabled } : template)),
    )
  }

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template)
    setIsEditDialogOpen(true)
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

  const totalEmailsSent = templates.reduce((sum, template) => sum + template.sentCount, 0)
  const activeTemplates = templates.filter((template) => template.enabled).length
  const deliveryRate = 94.2 // Mock delivery rate

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
            <p className="text-muted-foreground">Monitor email templates and delivery performance</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Emails Sent</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmailsSent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Templates</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeTemplates}</div>
              <p className="text-xs text-muted-foreground">out of {templates.length} total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deliveryRate}%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed Deliveries</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>Manage your email templates and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Sent Count</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{template.name}</span>
                          <span className="text-sm text-muted-foreground">{template.description}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch checked={template.enabled} onCheckedChange={() => toggleTemplate(template.id)} />
                          <Badge variant={template.enabled ? "default" : "secondary"}>
                            {template.enabled ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{template.lastUsed}</TableCell>
                      <TableCell>{template.sentCount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
                          Edit Template
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

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

        {/* Edit Template Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Email Template</DialogTitle>
              <DialogDescription>Modify the email template content and subject line.</DialogDescription>
            </DialogHeader>
            {selectedTemplate && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject Line</Label>
                  <Input id="subject" defaultValue={selectedTemplate.template.subject} placeholder="Email subject" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Email Content</Label>
                  <Textarea
                    id="content"
                    defaultValue={selectedTemplate.template.content}
                    placeholder="Email content"
                    rows={12}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditDialogOpen(false)}>Save Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarInset>
  )
}
