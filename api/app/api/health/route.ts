import { NextResponse } from "next/server";

/**
 * Handler untuk metode HTTP GET.
 * Biasanya digunakan untuk mengecek apakah backend sudah "up" atau aktif.
 */
export async function GET() {
    // 1. Inisialisasi object response dengan format JSON
    const response = NextResponse.json({
        status: "OK",
        message: "API is running on port 3001",
        timestamp: new Date().toISOString()
    });

    // --- KONFIGURASI CORS MANUAL ---
    // Bagian ini krusial agar aplikasi Frontend (misal: React/Next.js di port 3000) 
    // bisa mengambil data dari API ini (di port 3001).

    /**
     * Access-Control-Allow-Origin
     * '*': Mengizinkan semua domain. 
     * Catatan: Untuk keamanan produksi, ganti '*' dengan domain spesifik frontend Anda.
     */
    response.headers.set('Access-Control-Allow-Origin', '*');
    
    /**
     * Access-Control-Allow-Methods
     * Memberitahu browser bahwa API ini mendukung metode GET, POST, hingga DELETE.
     */
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    /**
     * Access-Control-Allow-Headers
     * Mengizinkan client mengirim header khusus seperti:
     * - Content-Type: Penting untuk pengiriman data JSON (application/json).
     * - Authorization: Penting jika API ini nantinya butuh login/token.
     */
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Mengembalikan response yang sudah ditempeli header CORS di atas
    return response;
}
