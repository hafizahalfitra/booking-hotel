import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Data Hotel di Lampung
    const hotels = [
        {
            nama: 'Radisson Lampung Kedaton',
            alamat: 'Jalan Teuku Umar No.1, Kedaton, Kec. Kedaton, Kota Bandar Lampung',
            deskripsi: 'Hotel bintang 5 dengan kamar luas, spa, pusat kebugaran, dan pilihan tempat makan yang beragam',
            rating: 8.8,
            thumbnailUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
            rooms: [
                { roomNumber: 'RDL-101', roomType: 'Deluxe Room', price: 750000, capacity: 2, isAvailable: true },
                { roomNumber: 'RDL-102', roomType: 'Deluxe Room', price: 750000, capacity: 2, isAvailable: true },
                { roomNumber: 'RDL-201', roomType: 'Executive Suite', price: 1000000, capacity: 3, isAvailable: true },
                { roomNumber: 'RDL-202', roomType: 'Executive Suite', price: 1000000, capacity: 3, isAvailable: false },
            ]
        },
        {
            nama: 'Emersia Hotel and Resort',
            alamat: 'Jl. Yos Sudarso No.194, Bandar Lampung',
            deskripsi: 'Resort dengan kolam renang outdoor, taman, bar, dan WiFi gratis di seluruh area',
            rating: 8.8,
            thumbnailUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
            rooms: [
                { roomNumber: 'EMS-101', roomType: 'Standard Room', price: 500000, capacity: 2, isAvailable: true },
                { roomNumber: 'EMS-102', roomType: 'Standard Room', price: 500000, capacity: 2, isAvailable: true },
                { roomNumber: 'EMS-201', roomType: 'Deluxe Room', price: 700000, capacity: 2, isAvailable: true },
                { roomNumber: 'EMS-301', roomType: 'Family Suite', price: 950000, capacity: 4, isAvailable: true },
            ]
        },
        {
            nama: 'Golden Tulip Springhill Lampung',
            alamat: 'Jl. Raden Intan No.88, Teluk Betung Utara, Bandar Lampung',
            deskripsi: 'Hotel dengan kolam renang outdoor, taman, teras, restoran, dan tempat fitness lengkap',
            rating: 8.3,
            thumbnailUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
            rooms: [
                { roomNumber: 'GT-101', roomType: 'Superior Room', price: 600000, capacity: 2, isAvailable: true },
                { roomNumber: 'GT-102', roomType: 'Superior Room', price: 600000, capacity: 2, isAvailable: true },
                { roomNumber: 'GT-201', roomType: 'Deluxe Room', price: 850000, capacity: 2, isAvailable: false },
                { roomNumber: 'GT-301', roomType: 'Executive Suite', price: 1200000, capacity: 3, isAvailable: true },
            ]
        },
        {
            nama: 'Holiday Inn Lampung Bukit Randu',
            alamat: 'Jl. Z.A. Pagar Alam No.1A, Rajabasa, Bandar Lampung',
            deskripsi: 'Hotel strategis dekat Tugu Adipura dan Mall Kartini dengan fasilitas modern',
            rating: 4.8,
            thumbnailUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
            rooms: [
                { roomNumber: 'HI-101', roomType: 'Standard Room', price: 600000, capacity: 2, isAvailable: true },
                { roomNumber: 'HI-102', roomType: 'Standard Room', price: 600000, capacity: 2, isAvailable: true },
                { roomNumber: 'HI-201', roomType: 'Deluxe Room', price: 800000, capacity: 2, isAvailable: true },
                { roomNumber: 'HI-301', roomType: 'Suite Room', price: 1100000, capacity: 3, isAvailable: true },
            ]
        },
        {
            nama: 'Aston Lampung City Hotel',
            alamat: 'Jl. Wolter Monginsidi No.175, Bandar Lampung',
            deskripsi: 'Hotel di pusat kota dengan akses mudah ke pantai, pusat kuliner, dan tempat wisata budaya',
            rating: 8.5,
            thumbnailUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
            rooms: [
                { roomNumber: 'AST-101', roomType: 'Superior Room', price: 550000, capacity: 2, isAvailable: true },
                { roomNumber: 'AST-102', roomType: 'Superior Room', price: 550000, capacity: 2, isAvailable: true },
                { roomNumber: 'AST-201', roomType: 'Deluxe Room', price: 750000, capacity: 2, isAvailable: true },
                { roomNumber: 'AST-202', roomType: 'Deluxe Room', price: 750000, capacity: 2, isAvailable: false },
            ]
        },
        {
            nama: 'Swiss-Belhotel Lampung',
            alamat: 'Jl. Raden Intan No.86, Bandar Lampung',
            deskripsi: 'Hotel berkualitas dengan Wi-Fi gratis, dekat pusat kota dan Mall Kartini',
            rating: 8.6,
            thumbnailUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
            rooms: [
                { roomNumber: 'SB-101', roomType: 'Standard Room', price: 500000, capacity: 2, isAvailable: true },
                { roomNumber: 'SB-102', roomType: 'Standard Room', price: 500000, capacity: 2, isAvailable: true },
                { roomNumber: 'SB-201', roomType: 'Executive Room', price: 800000, capacity: 2, isAvailable: true },
                { roomNumber: 'SB-301', roomType: 'Presidential Suite', price: 1500000, capacity: 4, isAvailable: true },
            ]
        },
        {
            nama: 'Lampung Marriott Resort & Spa',
            alamat: 'Jl. Soekarno Hatta No.1, Bandar Lampung',
            deskripsi: 'Resort mewah menghadap laut dengan pemandangan kota, pegunungan, area pantai pribadi, dan spa',
            rating: 9.0,
            thumbnailUrl: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800',
            rooms: [
                { roomNumber: 'MAR-101', roomType: 'Ocean View Room', price: 1200000, capacity: 2, isAvailable: true },
                { roomNumber: 'MAR-102', roomType: 'Ocean View Room', price: 1200000, capacity: 2, isAvailable: true },
                { roomNumber: 'MAR-201', roomType: 'Deluxe Suite', price: 1800000, capacity: 3, isAvailable: true },
                { roomNumber: 'MAR-301', roomType: 'Presidential Suite', price: 3000000, capacity: 4, isAvailable: false },
            ]
        }
    ];

    console.log('🌱 Mulai seeding database...');

    for (const hotelData of hotels) {
        const { rooms, ...hotelInfo } = hotelData;

        const hotel = await prisma.hotel.create({
            data: {
                ...hotelInfo,
                rooms: {
                    create: rooms
                }
            },
            include: {
                rooms: true
            }
        });

        console.log(`✅ Hotel "${hotel.nama}" berhasil ditambahkan dengan ${hotel.rooms.length} kamar`);
    }

    console.log('🎉 Seeding selesai!');
}

main()
    .catch((e) => {
        console.error('❌ Error saat seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
