import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({
                success: false,
                message: "File is required",
            }, { status: 400 })
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload using a stream (better for various file types)
        const result: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                folder: "drop-link",
                resource_type: "auto",
            }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }).end(buffer);
        });

        return NextResponse.json({
            success: true,
            message: "File uploaded successfully",
            data: {
                public_id: result.public_id,
                secure_url: result.secure_url,
                format: result.format,
                resource_type: result.resource_type
            }
        }, { status: 200 })

    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 })
    }
}
