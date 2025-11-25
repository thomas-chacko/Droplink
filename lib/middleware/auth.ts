import { NextRequest } from "next/server";
import { verifyToken as verifyJwt } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    userId: string;
}

export const verifyToken = async (request: NextRequest): Promise<DecodedToken | null> => {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return null;
    }

    return verifyJwt(token) as DecodedToken | null;
}
