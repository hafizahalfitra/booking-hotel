// api/app/api/auth/session/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../authOption";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        
        return NextResponse.json({
            user: session?.user || null,
            expires: session?.expires || null
        }, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error('Session error:', error);
        return NextResponse.json(
            { user: null, error: 'Failed to get session' },
            { status: 500 }
        );
    }
}