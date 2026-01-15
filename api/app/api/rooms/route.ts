// api/app/api/rooms/route.ts

// SOLUSI PERBAIKAN IMPORT: 
// Ganti path relatif menjadi Path Alias (@/lib/prisma)
// Anda mungkin perlu menyesuaikan @/lib/prisma jika prisma.ts Anda ada di lokasi yang berbeda.
import prisma from '@/utils/prisma';// Ganti dengan path alias yang benar

import { NextResponse } from 'next/server';

/**
 * @method GET
 * @path /api/rooms
 * @description Handler untuk mengambil daftar kamar yang tersedia, diurutkan berdasarkan harga.
 */
export async function GET() {
    try {
        // Logika untuk memanggil Prisma dan mendapatkan data kamar
        const rooms = await prisma.room.findMany({
            where: {
                // Hanya ambil kamar yang tersedia (isAvailable: true)
                isAvailable: true,
            },
            include: {
                hotel: true
            },
            orderBy: {
                // Urutkan berdasarkan harga termurah ke termahal
                price: 'asc',
            },
            // Tambahkan relasi lain jika diperlukan (e.g., include: { amenities: true })
        });

        // Jika berhasil, kirim data kamar dengan status 200 OK
        // 
        return NextResponse.json(rooms, { status: 200 });

    } catch (error) {
        // Tangani error database atau server
        console.error('API Error fetching rooms:', error);

        // Kirim respons error internal server dengan status 500
        return NextResponse.json(
            { message: 'Internal Server Error: Failed to fetch room data.' },
            { status: 500 }
        );
    }
}
