import connectDB from "@/server/db/connection";
import UserModel from "@/server/models/User";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/middleware/auth";
import { isValidObjectId } from "mongoose";
import { NextRequest } from "next/server";

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
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        }, { status: 500 });
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
                message: 'Invalid User ID format'
            }, { status: 400 });
        }

        const requestData = await request.json();

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $set: requestData },
            { new: true, fields: { password: 0 } }
        );

        if (!updatedUser) {
            return NextResponse.json({
                success: false,
                message: 'User not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            error: (error as Error).message
        },
            { status: 500 });
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
                message: 'Invalid User ID format'
            }, { status: 400 });
        }
        const deletedUser = await UserModel.findByIdAndDelete(id, { projection: { password: 0 } });

        if (!deletedUser) {
            return NextResponse.json({
                success: false,
                message: 'User not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            error: (error as Error).message
        },
            { status: 500 });
    }
}