import { connectToDatabase } from "./connect"
import ProductModel, { type Product, type TopProduct } from "./models/product"
import mongoose from "mongoose"

interface ProductFilter {
  category?: string
  minPrice?: number
  maxPrice?: number
  sort?: string
  page?: number
  limit?: number
  excludeId?: string
}

export async function getProducts(filter?: ProductFilter): Promise<Product[]> {
  await connectToDatabase()

  const query: any = {}

  if (filter?.category) {
    query.category = filter.category
  }

  if (filter?.minPrice !== undefined || filter?.maxPrice !== undefined) {
    query.price = {}
    if (filter.minPrice !== undefined) {
      query.price.$gte = filter.minPrice
    }
    if (filter.maxPrice !== undefined) {
      query.price.$lte = filter.maxPrice
    }
  }

  if (filter?.excludeId) {
    query._id = { $ne: new mongoose.Types.ObjectId(filter.excludeId) }
  }

  let sortOption = {}
  if (filter?.sort) {
    switch (filter.sort) {
      case "newest":
        sortOption = { createdAt: -1 }
        break
      case "price-low":
        sortOption = { price: 1 }
        break
      case "price-high":
        sortOption = { price: -1 }
        break
      default:
        sortOption = { createdAt: -1 }
    }
  }

  const page = filter?.page || 1
  const limit = filter?.limit || 10
  const skip = (page - 1) * limit

  const products = await ProductModel.find(query).sort(sortOption).skip(skip).limit(limit)

  return products
}

export async function getFilteredProducts(
  filter?: ProductFilter,
): Promise<{ products: Product[]; totalProducts: number }> {
  await connectToDatabase()

  const query: any = {}

  if (filter?.category) {
    query.category = filter.category
  }

  if (filter?.minPrice !== undefined || filter?.maxPrice !== undefined) {
    query.price = {}
    if (filter.minPrice !== undefined) {
      query.price.$gte = filter.minPrice
    }
    if (filter.maxPrice !== undefined) {
      query.price.$lte = filter.maxPrice
    }
  }

  let sortOption = {}
  if (filter?.sort) {
    switch (filter.sort) {
      case "newest":
        sortOption = { createdAt: -1 }
        break
      case "price-low":
        sortOption = { price: 1 }
        break
      case "price-high":
        sortOption = { price: -1 }
        break
      default:
        sortOption = { createdAt: -1 }
    }
  }

  const page = filter?.page || 1
  const limit = filter?.limit || 10
  const skip = (page - 1) * limit

  const [products, totalProducts] = await Promise.all([
    ProductModel.find(query).sort(sortOption).skip(skip).limit(limit),
    ProductModel.countDocuments(query),
  ])

  return { products, totalProducts }
}

export async function getProductById(id: string): Promise<Product | null> {
  await connectToDatabase()

  try {
    const product = await ProductModel.findById(id)
    return product
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function getProductStats(): Promise<{
  topProducts: TopProduct[]
  categorySales: { category: string; sales: number }[]
}> {
  // In a real app, this would query the database for actual stats
  // For this demo, we'll return mock data

  const topProducts: TopProduct[] = [
    {
      _id: new mongoose.Types.ObjectId(),
      name: "Wireless Bluetooth Earbuds",
      price: 79.99,
      salesCount: 120,
      revenue: 9598.8,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: "Smart Fitness Tracker",
      price: 49.99,
      salesCount: 85,
      revenue: 4249.15,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: "Organic Cotton T-Shirt",
      price: 24.99,
      salesCount: 65,
      revenue: 1624.35,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: "Stainless Steel Water Bottle",
      price: 34.99,
      salesCount: 50,
      revenue: 1749.5,
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: "Bamboo Cutting Board Set",
      price: 29.99,
      salesCount: 45,
      revenue: 1349.55,
    },
  ]

  const categorySales = [
    { category: "Electronics", sales: 25000 },
    { category: "Clothing", sales: 18000 },
    { category: "Home & Garden", sales: 15000 },
    { category: "Sports", sales: 12000 },
    { category: "Beauty", sales: 10000 },
  ]

  return { topProducts, categorySales }
}

