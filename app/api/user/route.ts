// GET logged-in user profile
// add a dummy get function to prevent build error

import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        success: true,
        message: 'User profile fetched successfully',
        data: {}
    }, { status: 200 });
}
