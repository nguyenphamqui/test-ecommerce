import mongoose, { type Document, Schema } from "mongoose"
import bcrypt from "bcryptjs"

export interface User extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  password: string
  avatar: string
  isAdmin: boolean
  orderCount?: number
  totalSpent?: number
  createdAt: string
  updatedAt: string
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "/placeholder.svg?height=32&width=32",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.models.User || mongoose.model<User>("User", userSchema)

