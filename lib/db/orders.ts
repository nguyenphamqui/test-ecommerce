import { connectToDatabase } from "./connect"
import OrderModel, { type Order } from "./models/order"

export async function getOrders(): Promise<Order[]> {
  await connectToDatabase()

  const orders = await OrderModel.find({}).sort({ createdAt: -1 })

  return orders
}

export async function getOrderById(id: string): Promise<Order | null> {
  await connectToDatabase()

  try {
    const order = await OrderModel.findById(id)
    return order
  } catch (error) {
    console.error("Error fetching order:", error)
    return null
  }
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  await connectToDatabase()

  const orders = await OrderModel.find({ "customer._id": userId }).sort({ createdAt: -1 })

  return orders
}

export async function getOrderStats(): Promise<{
  totalSales: number
  totalOrders: number
  salesGrowth: number
  ordersGrowth: number
  monthlySales: { month: string; revenue: number }[]
}> {
  // In a real app, this would query the database for actual stats
  // For this demo, we'll return mock data

  const totalSales = 150000
  const totalOrders = 1250
  const salesGrowth = 12
  const ordersGrowth = 8

  const monthlySales = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 19000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 25000 },
    { month: "May", revenue: 22000 },
    { month: "Jun", revenue: 30000 },
    { month: "Jul", revenue: 28000 },
    { month: "Aug", revenue: 25000 },
    { month: "Sep", revenue: 30000 },
    { month: "Oct", revenue: 35000 },
    { month: "Nov", revenue: 40000 },
    { month: "Dec", revenue: 50000 },
  ]

  return { totalSales, totalOrders, salesGrowth, ordersGrowth, monthlySales }
}

