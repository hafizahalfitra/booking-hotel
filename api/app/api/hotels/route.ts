import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function GET(req: NextRequest) {
    console.log('=== Hotels API Called ===');
    try {
        console.log('Fetching hotels from database...');
        const hotels = await prisma.hotel.findMany({
            include: {
                rooms: true
            },
            orderBy: {
                rating: 'desc'
            }
        });
        console.log(`Found ${hotels.length} hotels`);

        return NextResponse.json(hotels);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch hotels',
                // Menyertakan pesan error asli jika tersedia
                message: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
            },
            { status: 500 } // Status 500: Internal Server Error
        );
    }
}
