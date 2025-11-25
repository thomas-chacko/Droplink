import { verifyToken } from "@/lib/middleware/auth";
import UserModel from "@/server/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const user = await verifyToken(request);

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const users = await UserModel.find({}, { password: 0 });
        return NextResponse.json({
            message: 'Users data fetched successfully',
            users
        },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json({
            error: 'Internal Server Error'
        },
            { status: 500 }
        )
    }
}
