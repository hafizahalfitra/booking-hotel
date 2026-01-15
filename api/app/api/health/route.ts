import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({
        status: "OK",
        message: "API is running on port 3001",
        timestamp: new Date().toISOString()
    });

    // --- KONFIGURASI CORS MANUAL ---
    // Mengizinkan akses dari origin mana pun (sangat penting jika frontend di localhost:3000 dan backend di 3001)
    response.headers.set('Access-Control-Allow-Origin', '*');
    
    // Menentukan metode HTTP apa saja yang diizinkan untuk diakses oleh client
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Menentukan header apa saja yang boleh dikirimkan oleh client (seperti Content-Type untuk JSON)
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
}
