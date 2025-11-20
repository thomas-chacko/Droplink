import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const generateToken = (userId: string) => {
    console.log("Generating token for userId:", userId);
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}
