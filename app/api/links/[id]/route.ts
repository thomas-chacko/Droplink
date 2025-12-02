import { verifyToken } from "@/lib/middleware/auth";
import connectDB from "@/server/db/connection";
import LinkModel from "@/server/models/Link";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
                message: 'Invalid Link ID format'
            }, { status: 400 });
        }

        const link = await LinkModel.findById(id);

        if (!link) {
            return NextResponse.json({
                success: false,
                message: 'Link not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Link fetched successfully',
            data: link
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
                message: 'Invalid Link ID format'
            }, { status: 400 });
        }

        const requestData = await request.json();

        const updatedLink = await LinkModel.findByIdAndUpdate(
            id,
            { $set: requestData },
            { new: true }
        );

        if (!updatedLink) {
            return NextResponse.json({
                success: false,
                message: 'Link not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Link updated successfully',
            data: updatedLink
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
                message: 'Invalid Link ID format'
            }, { status: 400 });
        }

        const deletedLink = await LinkModel.findByIdAndDelete(id);

        if (!deletedLink) {
            return NextResponse.json({
                success: false,
                message: 'Link not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Link deleted successfully',
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        }, { status: 500 })
    }
}