import connectDB from "@/server/db/connection";
import UserModel from "@/server/models/User";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/middleware/auth";
import { isValidObjectId } from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const authenticatedUser = await verifyToken(request);
        if (!authenticatedUser) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;

        if (!isValidObjectId(id)) {
            return NextResponse.json({
                success: false,
                message: 'Invalid User ID format'
            }, { status: 400 });
        }

        const user = await UserModel.findById(id, { password: 0 });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'User not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'User fetched successfully',
            data: user
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error fetching user:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        }, { status: 500 });
    }
}
