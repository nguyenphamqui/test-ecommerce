"use server"

import { cookies } from "next/headers"
import { getUserById } from "./data"

// In a real app, this would use a proper authentication system
// with password hashing, JWT tokens, etc.

export async function login(email: string, password: string) {
  // Simulate authentication
  // In a real app, you would verify credentials against a database

  // For demo purposes, we'll accept any email with password "password"
  if (password !== "password") {
    throw new Error("Invalid credentials")
  }

  // Find a user with the provided email
  const users = await import("./data").then((mod) => mod.getUsers())
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

  if (!user) {
    throw new Error("User not found")
  }

  // Create a session
  const session = {
    userId: user.id,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  }

  // Store the session in a cookie
  const sessionCookie = JSON.stringify(session)
  cookies().set("session", sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  })

  return { success: true }
}

export async function register(name: string, email: string, password: string) {
  // In a real app, you would create a new user in the database
  // For this demo, we'll just simulate success

  return { success: true }
}

export async function logout() {
  // Delete the session cookie
  cookies().delete("session")

  return { success: true }
}

export async function getSession() {
  const sessionCookie = cookies().get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)

    // Check if the session has expired
    if (new Date(session.expires) < new Date()) {
      cookies().delete("session")
      return null
    }

    return session
  } catch (error) {
    return null
  }
}

export async function getCurrentUser() {
  const session = await getSession()

  if (!session) {
    return null
  }

  // Get the user from the database
  const user = await getUserById(session.userId)

  if (!user) {
    return null
  }

  // Don't return sensitive information
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  }
}

