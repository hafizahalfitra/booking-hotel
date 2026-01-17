import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

/**
 * Handler GET - Mengambil daftar hotel
 * Endpoint ini biasanya diakses melalui: GET /api/hotels
 */
export async function GET(req: NextRequest) {
    // Logging sederhana untuk memantau aktivitas API di console terminal
    console.log('=== Hotels API Called ===');
    try {
        console.log('Fetching hotels from database...');

        /**
         * Mengambil data hotel menggunakan Prisma
         * .findMany() : Mengambil banyak record sekaligus
         */
        const hotels = await prisma.hotel.findMany({
            // 'include': Melakukan Join/Eager Loading. 
            // Mengambil semua data 'rooms' yang terelasi dengan hotel tersebut.
            include: {
                rooms: true
            },
            // 'orderBy': Mengurutkan hasil berdasarkan rating tertinggi ke terendah
            orderBy: {
                rating: 'desc'
            }
        });
        console.log(`Found ${hotels.length} hotels`);

        // Mengembalikan data hotel dalam format JSON dengan status default 200 (OK)
        return NextResponse.json(hotels);
    } catch (error) {
        // Logging error secara detail untuk kebutuhan perbaikan (debugging)
        console.error('Error fetching hotels:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch hotels',
                // Menyertakan pesan error asli jika tersedia
                message: error instanceof Error ? error.message : 'Unknown error',
                // Stack trace hanya disertakan untuk membantu debugging di lingkungan development
                stack: error instanceof Error ? error.stack : undefined
            },
            { status: 500 } // Status 500: Internal Server Error
        );
    }
}
