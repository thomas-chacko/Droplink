import mongoose, { Schema, Model } from "mongoose";
import { Theme, User } from "@/types/user";

const ThemeSchema = new Schema<Theme>({
    bgColor: {
        type: String,
        required: false
    },
    textColor: {
        type: String,
        required: false
    }
},
    {
        _id: false
    }
)

const UsersSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    name: {
        type: String,
        required: false,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    theme: {
        type: ThemeSchema,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    avatar: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    isPremium: {
        type: Boolean,
        required: false,
        default: false
    }
},
    {
        timestamps: true
    }
)

// Ensure the model is always updated with the latest schema
const UserModel = mongoose.models.User ?
    mongoose.model<User>('User') :
    mongoose.model<User>('User', UsersSchema);

export default UserModel;