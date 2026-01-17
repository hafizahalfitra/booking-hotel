// app/api/auth/google/route.ts
// Memastikan route ini selalu dieksekusi di server (bukan statis) dan menggunakan runtime Node.js
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

// Inisialisasi Google OAuth Client menggunakan Client ID dari environment variable
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Konfigurasi CORS (Cross-Origin Resource Sharing)
 * Digunakan agar API dapat diakses dari domain frontend yang berbeda.
 */
const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/**
 * Handler untuk Preflight Request (CORS)
 * Browser mengirimkan request OPTIONS sebelum POST untuk mengecek izin akses.
 */
export function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// Interface untuk validasi struktur data request dari frontend
interface GoogleLoginRequest {
  token: string;
}

// Interface untuk memetakan data profil yang dikembalikan oleh Google
interface UserPayload {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  email_verified?: boolean | null;
}

/**
 * Helper function untuk mengembalikan Response dalam format JSON
 * Menyertakan header CORS secara otomatis pada setiap response.
 */
function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders,
  });
}

/**
 * Handler Utama POST
 * Menerima ID Token dari Google, memvalidasinya, dan menukarnya dengan JWT aplikasi.
 */
export async function POST(req: Request): Promise<Response> {
  try {
    // 1. Membaca body request sebagai teks mentah
    const raw = await req.text();

    if (!raw || raw.trim() === "") {
      return jsonResponse(
        { success: false, message: "Empty request body" },
        400
      );
    }

    // 2. Parsing teks mentah menjadi objek JSON
    let body: GoogleLoginRequest;
    try {
      body = JSON.parse(raw);
    } catch {
      return jsonResponse(
        { success: false, message: "Invalid JSON format" },
        400
      );
    }

    // 3. Pastikan token Google ada di dalam request
    if (!body.token) {
      return jsonResponse(
        { success: false, message: "Missing Google token" },
        400
      );
    }

    // 4. Verifikasi ID Token ke server Google menggunakan library google-auth-library
    // Proses ini memastikan token asli, belum expired, dan ditujukan untuk Client ID kita.
    const ticket = await client.verifyIdToken({
      idToken: body.token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Mengambil data user (payload) dari ticket hasil verifikasi
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
