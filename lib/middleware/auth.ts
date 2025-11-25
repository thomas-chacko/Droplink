import { NextRequest } from "next/server";
import { verifyToken as verifyJwt } from "@/lib/jwt";

export const verifyToken = async (request: NextRequest) => {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return null;
    }

    return verifyJwt(token);
}
