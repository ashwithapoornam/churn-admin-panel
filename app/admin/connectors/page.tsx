"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MoreHorizontal,
  Database,
  CheckCircle,
  XCircle,
  Plus,
  Settings,
  RefreshCw,
  Eye,
  Users,
  Activity,
} from "lucide-react"

const mockConnectors = [
  {
    id: "1",
    name: "WHMCS Production",
    type: "WHMCS",
    status: "connected",
    lastSync: "2024-01-15 14:30",
    recordCount: 1247,
    project: "Acme Corp",
    projectDetails: {
      name: "Acme Corp",
      description: "Main production environment for Acme Corporation",
      createdAt: "2023-06-01",
      lastUpdated: "2024-01-15",
      members: [
        { name: "John Doe", email: "john@acme.com", role: "Owner", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Jane Smith", email: "jane@acme.com", role: "Admin", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Mike Johnson", email: "mike@acme.com", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      stats: {
        totalUsers: 45,
        activeConnectors: 3,
        lastActivity: "2024-01-15 14:30",
      },
    },
  },
  {
    id: "2",
    name: "HostBill Staging",
    type: "HostBill",
    status: "error",
    lastSync: "2024-01-14 09:15",
    recordCount: 0,
    project: "TechStart Inc",
    projectDetails: {
      name: "TechStart Inc",
      description: "Development and testing environment",
      createdAt: "2023-08-15",
      lastUpdated: "2024-01-14",
      members: [
        {
          name: "Sarah Wilson",
          email: "sarah@techstart.com",
          role: "Owner",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        {
          name: "David Brown",
          email: "david@techstart.com",
          role: "Member",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      ],
      stats: {
        totalUsers: 12,
        activeConnectors: 1,
        lastActivity: "2024-01-14 09:15",
      },
    },
  },
  {
    id: "3",
    name: "WHMCS Development",
    type: "WHMCS",
    status: "connected",
    lastSync: "2024-01-15 16:45",
    recordCount: 523,
    project: "DataCorp",
    projectDetails: {
      name: "DataCorp",
      description: "Data analytics and processing platform",
      createdAt: "2023-09-20",
      lastUpdated: "2024-01-15",
      members: [
        { name: "Alex Chen", email: "alex@datacorp.com", role: "Owner", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Lisa Wang", email: "lisa@datacorp.com", role: "Admin", avatar: "/placeholder.svg?height=32&width=32" },
        {
          name: "Tom Rodriguez",
          email: "tom@datacorp.com",
          role: "Member",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        {
          name: "Emma Davis",
          email: "emma@datacorp.com",
          role: "Member",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      ],
      stats: {
        totalUsers: 28,
        activeConnectors: 2,
        lastActivity: "2024-01-15 16:45",
      },
    },
  },
]

export default function ConnectorsManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

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
                <BreadcrumbPage>Data Connectors</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Data Connectors</h1>
            <p className="text-muted-foreground">Manage data source connections and synchronization</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Create New Project</Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Connector
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Connector</DialogTitle>
                  <DialogDescription>Configure a new data source connector for your project.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" placeholder="Connector name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select connector type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whmcs">WHMCS</SelectItem>
                        <SelectItem value="hostbill">HostBill</SelectItem>
                        <SelectItem value="blesta">Blesta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="url" className="text-right">
                      API URL
                    </Label>
                    <Input id="url" placeholder="https://api.example.com" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="key" className="text-right">
                      API Key
                    </Label>
                    <Input id="key" type="password" placeholder="Your API key" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                    Test & Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connected Data Sources</CardTitle>
            <CardDescription>Monitor and manage your data source connections.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Connector</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockConnectors.map((connector) => (
                    <TableRow key={connector.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <div className="flex flex-col">
                            <span className="font-medium">{connector.name}</span>
                            <span className="text-sm text-muted-foreground">{connector.type} Connector</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{connector.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {connector.status === "connected" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <Badge variant={connector.status === "connected" ? "default" : "destructive"}>
                            {connector.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{connector.lastSync}</TableCell>
                      <TableCell>{connector.recordCount.toLocaleString()}</TableCell>
                      <TableCell>{connector.project}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Sync Now
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Test Connection
                            </DropdownMenuItem>
                            <Sheet>
                              <SheetTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                              </SheetTrigger>
                              <SheetContent className="w-[400px] sm:w-[540px]">
                                <SheetHeader>
                                  <SheetTitle>Project Details</SheetTitle>
                                  <SheetDescription>View project information and team members</SheetDescription>
                                </SheetHeader>
                                <div className="mt-6 space-y-6">
                                  <div className="space-y-4">
                                    <div>
                                      <h3 className="text-lg font-semibold">{connector.projectDetails.name}</h3>
                                      <p className="text-sm text-muted-foreground">
                                        {connector.projectDetails.description}
                                      </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label className="text-sm font-medium">Created</Label>
                                        <p className="text-sm text-muted-foreground">
                                          {connector.projectDetails.createdAt}
                                        </p>
                                      </div>
                                      <div className="space-y-2">
                                        <Label className="text-sm font-medium">Last Updated</Label>
                                        <p className="text-sm text-muted-foreground">
                                          {connector.projectDetails.lastUpdated}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                      <Card>
                                        <CardContent className="p-4">
                                          <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                              <p className="text-2xl font-bold">
                                                {connector.projectDetails.stats.totalUsers}
                                              </p>
                                              <p className="text-xs text-muted-foreground">Users</p>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                      <Card>
                                        <CardContent className="p-4">
                                          <div className="flex items-center gap-2">
                                            <Database className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                              <p className="text-2xl font-bold">
                                                {connector.projectDetails.stats.activeConnectors}
                                              </p>
                                              <p className="text-xs text-muted-foreground">Connectors</p>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                      <Card>
                                        <CardContent className="p-4">
                                          <div className="flex items-center gap-2">
                                            <Activity className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                              <p className="text-xs font-bold">Active</p>
                                              <p className="text-xs text-muted-foreground">Status</p>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="text-md font-semibold">Team Members</h4>
                                    <div className="space-y-3">
                                      {connector.projectDetails.members.map((member, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                          <Avatar className="h-8 w-8">
                                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                            <AvatarFallback>
                                              {member.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                              <p className="text-sm font-medium">{member.name}</p>
                                              <Badge
                                                variant={member.role === "Owner" ? "default" : "outline"}
                                                className="text-xs"
                                              >
                                                {member.role}
                                              </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{member.email}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </SheetContent>
                            </Sheet>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
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
