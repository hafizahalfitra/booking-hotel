import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        status: "OK",
        message: "API is running on port 3001",
        timestamp: new Date().toISOString()
    });
}