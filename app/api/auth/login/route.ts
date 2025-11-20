import { comparePassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";
import { validateEmail } from "@/lib/validation";
import connectDB from "@/server/db/connection";
import UserModel from "@/server/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        // validate email and password
        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: "Email and password are required"
            }, {
                status: 400
            });
        }

        // validate email format
        if (!validateEmail(email)) {
            return NextResponse.json({
                success: false,
                message: "Please provide a valid email address"
            }, {
                status: 400
            });
        }

        // check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials"
            }, {
                status: 401
            });
        }

        // validate password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials"
            }, {
                status: 401
            });
        }

        // generate token
        const token = generateToken(user._id.toString());

        return NextResponse.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isPremium: user.isPremium
            }
        }, {
            status: 200
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message || "Internal Server Error",
        },
            {
                status: 500
            });
    }
}