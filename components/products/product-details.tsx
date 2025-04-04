"use client"

import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/db/models/product"
import { Check, Heart, Minus, Plus, Share, ShoppingCart, Star, Truck } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const addToCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity,
        }),
      })

      if (response.ok) {
        toast.message('Added to cart!', {
            description: `${product.name} has been added to your cart.`
        })
      } else {
        toast.message('Error!', {
            description: "Failed to add to cart. Please try again."
        })
      }
    } catch (error) {
        console.log('🚀 ~ :47 ~ addToCart ~ error:', error)
        toast.message('Error!', {
            description: "Something went wrong. Please try again."
        })
    }
  }

  const addToWishlist = async () => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      })

      if (response.ok) {
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`,
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to add to wishlist. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

      <div className="flex items-center mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-500">4.0 (24 reviews)</span>
      </div>

      <p className="text-2xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>

      <p className="text-gray-700 mb-6">{product.description}</p>

      {/* Quantity Selector */}
      <div className="flex items-center mb-6">
        <span className="mr-4">Quantity:</span>
        <div className="flex items-center border rounded-md">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={decreaseQuantity}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={increaseQuantity}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={addToCart}>
          <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
        </Button>
        <Button variant="outline" className="flex-1" onClick={addToWishlist}>
          <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
        </Button>
      </div>

      {/* Product Meta */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center text-green-600">
          <Check className="mr-2 h-5 w-5" /> In Stock
        </div>
        <div className="flex items-center">
          <Truck className="mr-2 h-5 w-5" /> Free shipping on orders over $50
        </div>
        <div className="flex items-center">
          <Share className="mr-2 h-5 w-5" /> Share this product
        </div>
      </div>
    </div>
  )
}

