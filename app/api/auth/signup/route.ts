import { NextResponse } from "next/server";
import connectDB from "@/server/db/connection";
import UserModel from "@/server/models/User";

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
        console.log("existingUser",existingUser);
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "User already exists"
            },
                {
                    status: 400
                })
        }

        return NextResponse.json({ success: true, message: "User registered successfully" })

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
