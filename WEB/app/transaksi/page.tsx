'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Interface: Mendefinisikan struktur data transaksi yang diterima dari API
// Ini harus sesuai dengan response JSON dari backend (Prisma)
interface Transaction {
    id: number;
    checkIn: string;
    checkOut: string;
    jumlahTamu: number;
    nama: string;
    email: string;
    noHp: string;
    tipeKamar: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    room: {
        roomNumber: string;
        hotel: {
            nama: string;
            alamat: string;
        }
    };
}

export default function MyReservationPage() {
    const router = useRouter();

    // State Management
    // transactions: Array untuk menyimpan daftar riwayat pesanan
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    // loading: Indikator untuk menampilkan spinner saat data sedang diambil
    const [loading, setLoading] = useState(true);

    // useEffect: Dijalankan sekali saat halaman pertama kali dimuat (karena dependency array [router])
    useEffect(() => {
        const fetchTransactions = async () => {
            // Cek Keamanan / Auth Guard
            // Mengambil data user dari localStorage
            const userStr = localStorage.getItem('user');

            // Jika user belum login, redirect paksa ke halaman login
            if (!userStr) {
                router.push('/login');
                return;
            }

            const user = JSON.parse(userStr);
            // Validasi tambahan jika object user tidak memiliki email
            if (!user.email) {
                alert('User email not found in session');
                return;
            }

            // Request Data ke API
            try {
                // Mengirim request GET dengan query param email user
                // encodeURIComponent digunakan agar karakter spesial di email (seperti @) aman di URL
                const response = await fetch(
                    `http://localhost:3001/api/transaksi?email=${encodeURIComponent(user.email)}`,
                    {
                        headers: {
                            // Menyertakan Token JWT untuk lolos verifikasi di backend
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setTransactions(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                // Matikan Loading
                // Dijalankan baik request sukses maupun gagal agar UI tidak stuck
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [router]);

    // Tampilan Loading State (Skeleton/Spinner)
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg animate-pulse text-gray-500">Memuat data...</p>
            </div>
        );
    }

    // Tampilan Utama
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            // Bagian Judul Halaman
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Riwayat Pesanan
                </h1>
                <p className="text-gray-500 mt-2">
                    Semua pemesanan hotel yang pernah Anda lakukan
                </p>
            </div>

            // Logika Conditional Rendering:
            // Jika data kosong -> Tampilkan pesan 'Belum ada pesanan'
            
            {transactions.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-sm p-10 text-center">
                    <p className="text-gray-500 mb-6">
                        Belum ada pesanan yang tercatat
                    </p>
                    <button
                        onClick={() => router.push('/room')}
                        className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Cari Hotel Sekarang
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {transactions.map((trx) => (
                        <div
                            key={trx.id}
                            className="bg-white rounded-3xl shadow-sm hover:shadow-md transition p-6 md:p-8"
                        >
                            {/* Header Card */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {trx.room?.hotel?.nama}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {trx.room?.hotel?.alamat}
                                    </p>
                                </div>

                                <span
                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold w-fit
                                    ${trx.status === 'confirmed'
                                            ? 'bg-green-100 text-green-700'
                                            : trx.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {trx.status.toUpperCase()}
                                </span>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gray-200 mb-6" />

                            {/* Content */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Left */}
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs uppercase text-gray-400">Tipe Kamar</p>
                                        <p className="font-semibold">{trx.tipeKamar}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase text-gray-400">Nomor Kamar</p>
                                        <p className="font-semibold">{trx.room?.roomNumber}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase text-gray-400">Pemesan</p>
                                        <p className="font-semibold">{trx.nama}</p>
                                        <p className="text-sm text-gray-500">
                                            {trx.email} • {trx.noHp}
                                        </p>
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs uppercase text-gray-400">Check-in</p>
                                            <p className="font-semibold">
                                                {new Date(trx.checkIn).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase text-gray-400">Check-out</p>
                                            <p className="font-semibold">
                                                {new Date(trx.checkOut).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 rounded-2xl p-4">
                                        <p className="text-xs uppercase text-blue-600 font-semibold">
                                            Total Pembayaran
                                        </p>
                                        <p className="text-2xl font-bold text-blue-700">
                                            Rp {trx.totalPrice.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
