import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const verifyToken = async (request: NextRequest) => {
    const token = request.headers.get('authorization')?.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

    if (!token) {
        throw new Error('Unauthorized');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded
    } catch (error) {
        throw new Error('Invalid token');
    }
}
