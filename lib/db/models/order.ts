import mongoose, { type Document, Schema } from "mongoose"

export interface OrderItem {
  product: mongoose.Types.ObjectId
  quantity: number
  price: number
}

export interface Order extends Document {
  _id: mongoose.Types.ObjectId
  customer: {
    _id: mongoose.Types.ObjectId
    name: string
    email: string
  }
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "completed" | "cancelled"
  createdAt: string
  updatedAt: string
}

const orderSchema = new Schema(
  {
    customer: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Order || mongoose.model<Order>("Order", orderSchema)

