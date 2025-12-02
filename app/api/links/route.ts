import { verifyToken } from "@/lib/middleware/auth";
import connectDB from "@/server/db/connection";
import LinkModel from "@/server/models/Link";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const authenticatedUser = await verifyToken(request);

        if (!authenticatedUser) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const links = await LinkModel.find({ userId: authenticatedUser.userId })
        console.log("links", links);

        return NextResponse.json({
            success: true,
            message: 'Links fetched successfully',
            data: links
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const authenticatedUser = await verifyToken(request);

        if (!authenticatedUser) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { title, url, description, icon, order, isActive } = await request.json();

        if (!title || !url) {
            return NextResponse.json(
                { success: false, message: 'Title and URL are required' },
                { status: 400 }
            );
        }

        const link = await LinkModel.create({
            userId: authenticatedUser.userId,
            title,
            url,
            description,
            icon,
            order,
            isActive
        })

        return NextResponse.json({
            success: true,
            message: 'Link created successfully',
            data: link
        }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        }, { status: 500 })
    }
}