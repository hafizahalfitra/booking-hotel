import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({
        status: "OK",
        message: "API is running on port 3001",
        timestamp: new Date().toISOString()
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
}