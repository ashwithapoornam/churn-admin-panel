"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface CreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template: "",
    visibility: "private",
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock project creation
      const newProject = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        template: formData.template,
        visibility: formData.visibility,
        createdAt: new Date().toISOString().split("T")[0],
        owner: "Current User",
        memberCount: 1,
        status: "active",
      }

      toast({
        title: "Project Created Successfully",
        description: `${formData.name} has been created and is ready for use.`,
      })

      // Reset form
      setFormData({
        name: "",
        description: "",
        template: "",
        visibility: "private",
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error Creating Project",
        description: "There was an error creating your project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Set up a new project to organize your data connectors and team collaboration.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name *</Label>
            <Input
              id="project-name"
              placeholder="Enter project name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              placeholder="Describe your project (optional)"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-template">Project Template</Label>
            <Select value={formData.template} onValueChange={(value) => handleInputChange("template", value)}>
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Choose a template (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blank">Blank Project</SelectItem>
                <SelectItem value="ecommerce">E-commerce Analytics</SelectItem>
                <SelectItem value="saas">SaaS Metrics</SelectItem>
                <SelectItem value="marketing">Marketing Campaign</SelectItem>
                <SelectItem value="finance">Financial Dashboard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-visibility">Visibility</Label>
            <Select value={formData.visibility} onValueChange={(value) => handleInputChange("visibility", value)}>
              <SelectTrigger disabled={isLoading}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private - Only invited members</SelectItem>
                <SelectItem value="internal">Internal - All organization members</SelectItem>
                <SelectItem value="public">Public - Anyone with link</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !formData.name.trim()}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
