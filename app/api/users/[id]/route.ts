import connectDB from "@/server/db/connection";
import UserModel from "@/server/models/User";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const { id } = await params

        const user = await UserModel.findById(id, { password: 0 })

        if (!user) {
            return NextResponse.json({
                error: 'User not found'
            },
                { status: 404 }
            )
        }

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
