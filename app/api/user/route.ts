import { verifyToken } from "@/lib/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const user = await verifyToken(request)
        return NextResponse.json({
            message: 'User data fetched successfully',
            user
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
