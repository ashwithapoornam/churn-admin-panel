"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Users, Calendar, Activity } from "lucide-react"

const mockProjects = [
  {
    id: "1",
    name: "Acme Corp",
    description: "Main production environment",
    status: "active",
    createdAt: "2023-06-01",
    lastUpdated: "2024-01-15",
    memberCount: 8,
    owner: "John Doe",
    members: [
      { name: "John Doe", email: "john@acme.com", role: "Owner", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Jane Smith", email: "jane@acme.com", role: "Admin", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Mike Johnson", email: "mike@acme.com", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Sarah Wilson", email: "sarah@acme.com", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
      {
        name: "David Brown",
        email: "david@acme.com",
        role: "Read-only",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: "2",
    name: "TechStart Inc",
    description: "Development and testing environment",
    status: "active",
    createdAt: "2023-08-15",
    lastUpdated: "2024-01-14",
    memberCount: 5,
    owner: "Sarah Wilson",
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
        role: "Admin",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      { name: "Lisa Wang", email: "lisa@techstart.com", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
      {
        name: "Tom Rodriguez",
        email: "tom@techstart.com",
        role: "Member",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        name: "Emma Davis",
        email: "emma@techstart.com",
        role: "Read-only",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: "3",
    name: "DataCorp",
    description: "Data analytics and processing platform",
    status: "active",
    createdAt: "2023-09-20",
    lastUpdated: "2024-01-15",
    memberCount: 12,
    owner: "Alex Chen",
    members: [
      { name: "Alex Chen", email: "alex@datacorp.com", role: "Owner", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Lisa Wang", email: "lisa@datacorp.com", role: "Admin", avatar: "/placeholder.svg?height=32&width=32" },
      {
        name: "Tom Rodriguez",
        email: "tom@datacorp.com",
        role: "Admin",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      { name: "Emma Davis", email: "emma@datacorp.com", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Chris Lee", email: "chris@datacorp.com", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
      {
        name: "Anna Kim",
        email: "anna@datacorp.com",
        role: "Read-only",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
]

export default function ProjectsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState(null)
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false)

  const filteredProjects = mockProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleMembersClick = (project) => {
    setSelectedProject(project)
    setIsMembersDialogOpen(true)
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
                <BreadcrumbPage>Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects Management</h1>
            <p className="text-muted-foreground">Organize and manage your projects and team members</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Project
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>A list of all projects in your organization with their current status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{project.name}</span>
                          <span className="text-sm text-muted-foreground">{project.description}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{project.status}</Badge>
                      </TableCell>
                      <TableCell>{project.owner}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMembersClick(project)}
                          className="h-auto p-0 font-normal"
                        >
                          <Users className="mr-1 h-3 w-3" />
                          {project.memberCount} members
                        </Button>
                      </TableCell>
                      <TableCell>{project.createdAt}</TableCell>
                      <TableCell>{project.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Members Dialog */}
        <Dialog open={isMembersDialogOpen} onOpenChange={setIsMembersDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Project Members</DialogTitle>
              <DialogDescription>{selectedProject?.name} - Team members and their roles</DialogDescription>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Created</p>
                      <p className="text-muted-foreground">{selectedProject.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Last Updated</p>
                      <p className="text-muted-foreground">{selectedProject.lastUpdated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Members</p>
                      <p className="text-muted-foreground">{selectedProject.memberCount}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Team Members</h4>
                  {selectedProject.members.map((member, index) => (
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
                          <Badge variant={member.role === "Owner" ? "default" : "outline"} className="text-xs">
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </SidebarInset>
  )
}
