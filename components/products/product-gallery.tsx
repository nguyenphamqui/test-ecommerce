"use client"

import type { Product } from "@/lib/db/models/product"
import Image from "next/image"
import { useState } from "react"

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  // In a real app, product would have multiple images
  // For this demo, we'll create fake thumbnails
  const images = [
    product.image || "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
  ]

  return (
    <div className="space-y-4">
      <div className="aspect-square relative rounded-lg overflow-hidden border">
        <Image src={images[selectedImage] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`aspect-square relative rounded-md overflow-hidden border cursor-pointer ${selectedImage === index ? "ring-2 ring-primary" : ""}`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

