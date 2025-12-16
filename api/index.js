// 1. Impor Modul yang Diperlukan
require('dotenv').config(); // Pastikan variabel dari .env dimuat
const express = require('express');
const { PrismaClient } = require('@prisma/client');

// 2. Inisialisasi Aplikasi dan Prisma Client
const app = express();
const prisma = new PrismaClient(); // Membuat instance Prisma Client
const PORT = process.env.PORT || 5000;

// 3. Middleware
app.use(express.json()); // Untuk memparsing body JSON dari request

// 4. Rute Dasar (Rute Kesehatan)
app.get('/', (req, res) => {
    res.send('API Booking Hotel Berjalan!');
});

// 5. Rute Kamar (Contoh: Menambahkan Kamar Baru)
app.post('/api/rooms', async (req, res) => {
    try {
        const newRoom = await prisma.room.create({
            data: {
                roomNumber: req.body.roomNumber,
                roomType: req.body.roomType,
                price: parseFloat(req.body.price),
                isAvailable: true, 
                capacity: parseInt(req.body.capacity),
            },
        });
        res.status(201).json({ 
            message: 'Kamar berhasil ditambahkan',
            room: newRoom 
        });
    } catch (error) {
        console.error('Gagal menambahkan kamar:', error);
        res.status(500).json({ error: 'Gagal menambahkan kamar ke database.' });
    }
});

// 6. Jalankan Server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

// file: index.js

// ... (kode app.post sebelumnya) ...

// 7. Rute Kamar (Contoh: Mendapatkan Semua Kamar)
app.get('/api/rooms', async (req, res) => {
    try {
        // Menggunakan prisma.room.findMany() untuk mengambil semua data kamar
        const rooms = await prisma.room.findMany({
            // Anda bisa menambahkan klausa 'select' atau 'where' di sini jika diperlukan
        });
        
        // Mengirim data kamar dalam format JSON
        res.status(200).json(rooms);

    } catch (error) {
        console.error('Gagal mengambil daftar kamar:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data dari database.' });
    }
});

// 8. Jalankan Server (blok ini sudah ada)
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});


// file: index.js

// ... (kode app.get sebelumnya) ...

// 8. Rute Kamar (Update Kamar Berdasarkan ID)
app.patch('/api/rooms/:id', async (req, res) => {
    // Ambil ID dari parameter URL, dan konversi ke integer
    const roomId = parseInt(req.params.id); 
    
    // Siapkan data yang akan diupdate. 
    // Kita hanya mengambil field yang benar-benar dikirimkan di body (misalnya, hanya price yang diubah)
    const updateData = {};
    if (req.body.roomNumber) updateData.roomNumber = req.body.roomNumber;
    if (req.body.roomType) updateData.roomType = req.body.roomType;
    if (req.body.price) updateData.price = parseFloat(req.body.price);
    if (req.body.isAvailable !== undefined) updateData.isAvailable = req.body.isAvailable;
    if (req.body.capacity) updateData.capacity = parseInt(req.body.capacity);
    
    try {
        const updatedRoom = await prisma.room.update({
            where: {
                id: roomId, // Mencari kamar berdasarkan ID
            },
            data: updateData, // Data baru yang akan dimasukkan
        });

        res.status(200).json({ 
            message: `Kamar ID ${roomId} berhasil diperbarui.`,
            room: updatedRoom 
        });

    } catch (error) {
        console.error('Gagal memperbarui kamar:', error);
        // P2025 adalah error Prisma ketika record yang diupdate tidak ditemukan (ID salah)
        if (error.code === 'P2025') {
            return res.status(404).json({ error: `Kamar dengan ID ${roomId} tidak ditemukan.` });
        }
        res.status(500).json({ error: 'Gagal memperbarui kamar.' });
    }
});

// file: index.js

// ... (kode app.patch sebelumnya) ...

// 9. Rute Kamar (Delete Kamar Berdasarkan ID)
app.delete('/api/rooms/:id', async (req, res) => {
    const roomId = parseInt(req.params.id);

    try {
        await prisma.room.delete({
            where: {
                id: roomId, // Mencari kamar berdasarkan ID
            },
        });

        res.status(204).send(); // Status 204 No Content umumnya digunakan untuk penghapusan sukses

    } catch (error) {
        console.error('Gagal menghapus kamar:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: `Kamar dengan ID ${roomId} tidak ditemukan.` });
        }
        res.status(500).json({ error: 'Gagal menghapus kamar.' });
    }
});

// ... (lanjutan kode app.listen) ...