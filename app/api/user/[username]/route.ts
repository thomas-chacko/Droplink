import connectDB from "@/server/db/connection";
import LinkModel from "@/server/models/Link";
import UserModel from "@/server/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
    try {
        await connectDB()

        const { username } = await params;

        // find user by username
        const user = await UserModel.findOne({ username }, { password: 0, email: 0 })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            })
        }

        // find user's active links
        const links = await LinkModel.find({ userId: user._id, isActive: true })
            .sort({ createdAt: -1 })
            .select("-userId -isActive -__v")
            .lean()

        return NextResponse.json({
            sucess: true,
            message: "Profile fetched successfully",
            data: {
                user: {
                    username: user.username,
                    name: user.name,
                    bio: user.bio,
                    avatar: user.avatar,
                    coverImage: user.coverImage,
                    isPremium: user.isPremium,
                    location: user.location,
                    theme: user.theme,
                    socialLinks: user.socialLinks,
                },
                links
            }
        })
    } catch (error: any) {
        return NextResponse.json({
            sucess: false,
            message: "Something went wrong",
            error: error.message
        }, {
            status: 500
        })
    }
}
