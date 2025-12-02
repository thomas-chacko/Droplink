import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Link } from "@/types/link";

const LinksSchema = new Schema<Link>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        url: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2048
        },
        description: {
            type: String,
            trim: true,
            maxlength: 255
        },
        icon: {
            type: String,
            trim: true,
            maxlength: 255
        },
        order: {
            type: Number,
            default: 0,
            index: true,
            unique: true
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

LinksSchema.index({ userId: 1, order: 1 });

LinksSchema.index({ userId: 1, isActive: 1 });

const LinkModel =
    mongoose.models.Link ||
    mongoose.model<Link>("Link", LinksSchema);

export default LinkModel;
