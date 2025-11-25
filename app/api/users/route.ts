import connectDB from "@/server/db/connection";
import { verifyToken } from "@/lib/middleware/auth";
import UserModel from "@/server/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        // 1. Authentication Check
        const user = await verifyToken(request);
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        // 2. Fetch Data
        const users = await UserModel.find({}, { password: 0 }).sort({ createdAt: -1 });

        // 3. Success Response
        return NextResponse.json({
            success: true,
            message: 'Users fetched successfully',
            data: users
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error fetching users:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        }, { status: 500 });
    }
}
