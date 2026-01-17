import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';

// POST - Buat transaksi baru
// Endpoint ini dilindungi (butuh token JWT)
export async function POST(req: NextRequest) {
    try {
        // Verifikasi Header Authorization
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Ekstrak dan Verifikasi Token JWT
        // Jika token invalid atau expired, jwt.verify akan throw error yang ditangkap di catch block

        const token = authHeader.substring(7);
        jwt.verify(token, process.env.JWT_SECRET!);

        // Parsing dan Validasi Input Body
        const body = await req.json();
        const { roomId, checkIn, checkOut, jumlahTamu, nama, email, noHp } = body;

        // Pastikan semua field wajib terisi
        if (!roomId || !checkIn || !checkOut || !jumlahTamu || !nama || !email || !noHp) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Cek Ketersediaan Room di Database
        const room = await prisma.room.findUnique({
            where: { id: roomId },
            include: { hotel: true }
        });

        // Validasi keberadaan room
        if (!room) {
            return NextResponse.json(
                { error: 'Room not found' },
                { status: 404 }
            );
        }

        // Validasi status ketersediaan room (Flag isAvailable)
        // Catatan: Logic ini hanya mengecek status boolean global kamar,
        // belum mengecek bentrok tanggal dengan reservasi lain.
        if (!room.isAvailable) {
            return NextResponse.json(
                { error: 'Room is not available' },
                { status: 400 }
            );
        }

        // Kalkulasi Harga Total
        // Konversi string tanggal ke object Date
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        // Hitung selisih waktu dalam miliseconds lalu konversi ke hari
        // Rumus: (selisih ms) / (1000ms * 60detik * 60menit * 24jam)
        const days = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

        // Pastikan minimal 1 hari jika check-in dan check-out di hari yang sama (opsional logic)
        const totalPrice = room.price * days;

        // Simpan Transaksi ke Database
        const transaksi = await prisma.transaksi.create({
            data: {
                roomId,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                jumlahTamu,
                nama,
                email,
                noHp,
                // Menyimpan snapshot tipe kamar & harga saat transaksi dibuat
                tipeKamar: room.roomType,
                totalPrice,
                status: 'pending'
            },
            // Mengambil relasi room & hotel agar response ke frontend lengkap
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

// GET - Mengambil riwayat transaksi berdasarkan Email User
export async function GET(req: NextRequest) {
    try {
        // Ambil query parameter dari URL
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        // Validasi parameter email wajib ada
        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        // Query Database
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
