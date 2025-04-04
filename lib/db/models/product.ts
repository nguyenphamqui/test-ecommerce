import mongoose, { type Document, Schema } from "mongoose"

export interface Product extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  createdAt: string
  updatedAt: string
}

export interface TopProduct {
  _id: mongoose.Types.ObjectId
  name: string
  price: number
  salesCount: number
  revenue: number
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: "/placeholder.svg?height=300&width=300",
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Product || mongoose.model<Product>("Product", productSchema)

