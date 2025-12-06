// app/api/auth/google/route.ts
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: corsHeaders,
    });
}

interface GoogleLoginRequest {
    token: string;
}

interface UserPayload {
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    email_verified?: boolean | null;
}

function jsonResponse(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: corsHeaders,
    });
}

export async function POST(req: Request): Promise<Response> {
    try {
        const raw = await req.text();

        if (!raw || raw.trim() === "") {
            return jsonResponse(
                { success: false, message: "Empty request body" },
                400
            );
        }

        let body: GoogleLoginRequest;
        try {
            body = JSON.parse(raw);
        } catch {
            return jsonResponse(
                { success: false, message: "Invalid JSON format" },
                400
            );
        }

        if (!body.token) {
            return jsonResponse(
                { success: false, message: "Missing Google token" },
                400
            );
        }

        const ticket = await client.verifyIdToken({
            idToken: body.token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload() as UserPayload | undefined;

        if (!payload || !payload.email) {
            return jsonResponse(
                { success: false, message: "Invalid Google token payload" },
                401
            );
        }

        const user = {
            name: payload.name || "",
            email: payload.email,
            picture: payload.picture || "",
            verified: !!payload.email_verified,
        };

        const appToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, {
            expiresIn: "1d",
        });

        return jsonResponse(
            {
                success: true,
                user,
                token: appToken,
            },
            200
        );
    } catch (error) {
        console.error("ERROR API:", error);
        return jsonResponse(
            { success: false, message: "Server error", error: String(error) },
            500
        );
    }
}
