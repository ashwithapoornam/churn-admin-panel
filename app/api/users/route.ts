import { type NextRequest, NextResponse } from "next/server"

// Mock user data
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    role: "admin",
    country: "US",
    lastLogin: "2024-01-15",
    createdAt: "2023-06-01",
    isNewlyAdded: false,
    isChurned: false,
    teams: ["Team Alpha", "Team Beta"],
  },
  // Add more mock users as needed
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const role = searchParams.get("role")
  const search = searchParams.get("search")

  let filteredUsers = users

  if (status && status !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.status === status)
  }

  if (role && role !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.role === role)
  }

  if (search) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    )
  }

  return NextResponse.json(filteredUsers)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  // Create new user
  const newUser = {
    id: String(users.length + 1),
    name: body.name,
    email: body.email,
    status: body.status || "active",
    role: body.role || "member",
    country: body.country || "US",
    lastLogin: new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString().split("T")[0],
    isNewlyAdded: true,
    isChurned: false,
    teams: body.teams || [],
  }

  users.push(newUser)

  return NextResponse.json(newUser, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { id, ...updateData } = body

  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  users[userIndex] = { ...users[userIndex], ...updateData }

  return NextResponse.json(users[userIndex])
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  users.splice(userIndex, 1)

  return NextResponse.json({ message: "User deleted successfully" })
}
