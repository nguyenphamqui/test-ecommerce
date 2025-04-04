import { getProductById } from "@/lib/db/products"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Get wishlist items
export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET)

    // Get wishlist from cookies
    const wishlistCookie = (await cookies()).get("wishlist")?.value
    const wishlist = wishlistCookie ? JSON.parse(wishlistCookie) : []

    // Get product details for each item in the wishlist
    const wishlistWithProducts = await Promise.all(
      wishlist.map(async (productId: string) => {
        const product = await getProductById(productId)
        return product
          ? {
              id: product._id,
              name: product.name,
              price: product.price,
              image: product.image,
            }
          : null
      }),
    )

    // Filter out null values (products that no longer exist)
    const filteredWishlist = wishlistWithProducts.filter((item) => item !== null)

    return NextResponse.json(filteredWishlist)
  } catch (error) {
    console.error("Wishlist error:", error)
    return NextResponse.json({ error: "Failed to get wishlist" }, { status: 500 })
  }
}

// Add item to wishlist
export async function POST(request: Request) {
  try {
    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    // Get the product to verify it exists
    const product = await getProductById(productId)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Get current wishlist from cookies
    const wishlistCookie = (await cookies()).get("wishlist")?.value
    const wishlist = wishlistCookie ? JSON.parse(wishlistCookie) : []

    // Check if product already in wishlist
    if (!wishlist.includes(productId)) {
      // Add new item to wishlist
      wishlist.push(productId)
    }

    // Save wishlist to cookies
    (await
          // Save wishlist to cookies
          cookies()).set("wishlist", JSON.stringify(wishlist), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    })

    return NextResponse.json({ success: true, wishlist })
  } catch (error) {
    console.error("Wishlist error:", error)
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 })
  }
}

