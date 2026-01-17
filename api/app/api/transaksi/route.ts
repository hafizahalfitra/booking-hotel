import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';

// POST - Buat transaksi baru
// Endpoint ini dilindungi (butuh token JWT)
export async function POST(req: NextRequest) {
    try {
        // 1. Verifikasi Header Authorization
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // 2. Ekstrak dan Verifikasi Token JWT
        // Jika token invalid atau expired, jwt.verify akan throw error yang ditangkap di catch block

        const token = authHeader.substring(7);
        jwt.verify(token, process.env.JWT_SECRET!);

        const body = await req.json();
        const { roomId, checkIn, checkOut, jumlahTamu, nama, email, noHp } = body;

        if (!roomId || !checkIn || !checkOut || !jumlahTamu || !nama || !email || !noHp) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Cek apakah room tersedia
        const room = await prisma.room.findUnique({
            where: { id: roomId },
            include: { hotel: true }
        });

        if (!room) {
            return NextResponse.json(
                { error: 'Room not found' },
                { status: 404 }
            );
        }

        if (!room.isAvailable) {
            return NextResponse.json(
                { error: 'Room is not available' },
                { status: 400 }
            );
        }

        // Hitung total harga (jumlah hari * harga per malam)
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const days = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        const totalPrice = room.price * days;

        // Buat transaksi
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
                    include: {
                        hotel: true
                    }
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

// GET - Ambil daftar transaksi user
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
                    mode: 'insensitive'
                }
            },
            include: {
                room: {
                    include: {
                        hotel: true
                    }
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
