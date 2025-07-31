import { type NextRequest, NextResponse } from "next/server"

// Mock team data
const teams = [
  {
    id: "1",
    name: "Team Alpha",
    description: "Main development team",
    memberCount: 8,
    projectCount: 3,
    createdAt: "2023-06-01",
    owner: "John Doe",
    members: [
      { id: "1", name: "John Doe", role: "Admin", email: "john@example.com" },
      { id: "2", name: "Jane Smith", role: "Member", email: "jane@example.com" },
      { id: "3", name: "Mike Johnson", role: "Member", email: "mike@example.com" },
    ],
  },
  {
    id: "2",
    name: "Team Beta",
    description: "Analytics and insights team",
    memberCount: 5,
    projectCount: 2,
    createdAt: "2023-08-15",
    owner: "Sarah Wilson",
    members: [
      { id: "4", name: "Sarah Wilson", role: "Admin", email: "sarah@example.com" },
      { id: "5", name: "Tom Brown", role: "Member", email: "tom@example.com" },
    ],
  },
]

export async function GET() {
  return NextResponse.json(teams)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newTeam = {
    id: String(teams.length + 1),
    name: body.name,
    description: body.description,
    memberCount: 1,
    projectCount: 0,
    createdAt: new Date().toISOString().split("T")[0],
    owner: body.owner,
    members: [{ id: body.ownerId, name: body.owner, role: "Admin", email: body.ownerEmail }],
  }

  teams.push(newTeam)

  return NextResponse.json(newTeam, { status: 201 })
}
