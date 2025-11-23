import mongoose, { Schema } from "mongoose";
import { Settings, Theme, User } from "@/types/user";

const ThemeSchema = new Schema<Theme>({
    bgColor: {
        type: String,
        required: false
    },
    textColor: {
        type: String,
        required: false
    },
    bgStyle: {
        type: String,
        required: false,
        default: "light",
        enum: ["light", "dark", "gradient"]
    },
    buttonStyle: {
        type: String,
        required: false,
        default: "rounded",
        enum: ["rounded", "square", "outline"]
    }
},
    {
        _id: false
    }
)

const SettingsSchema = new Schema<Settings>({
    isPublic: {
        type: Boolean,
        required: false,
    },
    customDomain: {
        type: String,
        required: false,
    },
    showPremiumBadge: {
        type: Boolean,
        required: false,
    }
},
    {
        _id: false
    })

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
    },
    theme: {
        type: ThemeSchema,
        required: false
    },
    socialLinks: {
        type: Map,
        of: String,
        required: false
    },
    settings: {
        type: SettingsSchema,
        required: false
    }
},
    {
        timestamps: true
    }
)

// indexes
UsersSchema.index({ username: 1 }, { unique: true });
UsersSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.models.User ?
    mongoose.model<User>('User') :
    mongoose.model<User>('User', UsersSchema);

export default UserModel;