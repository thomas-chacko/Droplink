import mongoose from "mongoose"

export interface Link extends Document {
    userId: mongoose.Types.ObjectId
    title: string
    url: string
    description?: string
    icon: string
    order: number
    isActive: boolean
}