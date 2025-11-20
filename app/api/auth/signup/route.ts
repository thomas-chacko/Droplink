import { NextResponse } from "next/server";
import connectDB from "@/server/db/connection";
import UserModel from "@/server/models/User";
import { hashPassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { username, email, password } = await req.json()

        if (!username || !email || !password) {
            return NextResponse.json({
                success: false,
                message: "Please provide all required fields"
            },
                {
                    status: 400
                })
        }

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "User already exists"
            },
                {
                    status: 400
                })
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword
        })

        const token = generateToken(newUser._id)

        return NextResponse.json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isPremium: newUser.isPremium,
                theme: newUser.theme,
                bio: newUser.bio
            }
        },
            {
                status: 201
            })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message || "Internal Server Error",
        },
            {
                status: 500
            })
    }
}
