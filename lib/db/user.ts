import { connectToDatabase } from "./connect"
import UserModel, { type User } from "./models/user"

export async function getUsers(): Promise<User[]> {
  await connectToDatabase()

  const users = await UserModel.find({})

  // Add some mock data for the dashboard
  const usersWithStats = users.map((user) => {
    const orderCount = Math.floor(Math.random() * 10)
    const totalSpent = Math.floor(Math.random() * 1000)

    return {
      ...user.toObject(),
      orderCount,
      totalSpent,
    }
  })

  return usersWithStats
}

export async function getUserById(id: string): Promise<User | null> {
  await connectToDatabase()

  try {
    const user = await UserModel.findById(id)
    return user
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  await connectToDatabase()

  try {
    const user = await UserModel.findOne({ email })
    return user
  } catch (error) {
    console.error("Error fetching user by email:", error)
    return null
  }
}

export async function createUser(userData: { name: string; email: string; password: string }): Promise<User> {
  await connectToDatabase()

  const user = new UserModel(userData)
  await user.save()

  return user
}

