import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';

/**
 * POST - Membuat transaksi reservasi baru
 */
export async function POST(req: NextRequest) {
    try {
        // Auth Validation
        const authHeader = req.headers.get('authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // JWT Verification
        const token = authHeader.substring(7);
        jwt.verify(token, process.env.JWT_SECRET!);

        // Request Body Parsing
        const body = await req.json();
        const { roomId, checkIn, checkOut, jumlahTamu, nama, email, noHp } = body;

        // Validation: Required fields
        if (!roomId || !checkIn || !checkOut || !jumlahTamu || !nama || !email || !noHp) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Database Check: Room existence
        const room = await prisma.room.findUnique({
            where: { id: roomId },
            include: { hotel: true }
        });

        if (!room) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        // Validation: Availability status
        if (!room.isAvailable) {
            return NextResponse.json({ error: 'Room is not available' }, { status: 400 });
        }

        // Calculation: Total price based on days
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const diffInMs = checkOutDate.getTime() - checkInDate.getTime();
        const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
        
        const totalPrice = room.price * days;

        // DB Transaction: Save data with snapshots
        const transaksi = await prisma.transaksi.create({
            data: {
                roomId,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                jumlahTamu,
                nama,
                email,
                noHp,
                tipeKamar: room.roomType,
                totalPrice,
                status: 'pending'
            },
            include: {
                room: {
                    include: { hotel: true }
                }
            }
        });

        return NextResponse.json(transaksi, { status: 201 });
    } catch (error) {
        console.error('Error creating transaksi:', error);
        return NextResponse.json(
            { error: `Failed to create transaksi: ${error instanceof Error ? error.message : String(error)}` },
            { status: 500 }
        );
    }
}

/**
 * GET - Mengambil riwayat transaksi berdasarkan email
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        const transactions = await prisma.transaksi.findMany({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive' // Case-insensitive search
                }
            },
            include: {
                room: {
                    include: { hotel: true }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch transactions' },
            { status: 500 }
        );
    }
}