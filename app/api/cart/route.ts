import { getProductById } from "@/lib/db/products"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Get cart items
export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET)

    // Get cart from cookies
    const cartCookie = (await cookies()).get("cart")?.value
    const cart = cartCookie ? JSON.parse(cartCookie) : []

    // Get product details for each item in the cart
    const cartWithProducts = await Promise.all(
      cart.map(async (item: { productId: string; quantity: number }) => {
        const product = await getProductById(item.productId)
        return {
          ...item,
          product: product
            ? {
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
              }
            : null,
        }
      }),
    )

    return NextResponse.json(cartWithProducts)
  } catch (error) {
    console.error("Cart error:", error)
    return NextResponse.json({ error: "Failed to get cart" }, { status: 500 })
  }
}

// Add item to cart
export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json()

    if (!productId || !quantity) {
      return NextResponse.json({ error: "Product ID and quantity are required" }, { status: 400 })
    }

    // Get the product to verify it exists
    const product = await getProductById(productId)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Get current cart from cookies
    const cartCookie = (await cookies()).get("cart")?.value
    const cart = cartCookie ? JSON.parse(cartCookie) : []

    // Check if product already in cart
    const existingItemIndex = cart.findIndex((item: { productId: string }) => item.productId === productId)

    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      cart[existingItemIndex].quantity += quantity
    } else {
      // Add new item to cart
      cart.push({ productId, quantity })
    }

    // Save cart to cookies
    (await
          // Save cart to cookies
          cookies()).set("cart", JSON.stringify(cart), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    })

    return NextResponse.json({ success: true, cart })
  } catch (error) {
    console.error("Cart error:", error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}

