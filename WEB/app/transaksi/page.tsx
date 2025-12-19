'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                router.push('/login');
                return;
            }

            const user = JSON.parse(userStr);
            if (!user.name) {
                alert('User name not found in session');
                return;
            }

            try {
                // Fetch transactions filtered by name
                const response = await fetch(`http://localhost:3001/api/transaksi?nama=${encodeURIComponent(user.name)}`, {
                    // Optionally add auth header if GET also requires it, though user request implied name filter is key
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTransactions(data);
                } else {
                    console.error('Failed to fetch transactions');
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Riwayat Pesanan Saya</h1>

            {transactions.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 mb-4">Belum ada pesanan</p>
                    <button
                        onClick={() => router.push('/room')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Cari Hotel
                    </button>
                </div>
            ) : (
                <div className="grid gap-6">
                    {transactions.map((trx) => (
                        <div key={trx.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {trx.room?.hotel?.nama || 'Hotel Info Unavailable'}
                                    </h2>
                                    <p className="text-sm text-gray-600">{trx.room?.hotel?.alamat}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 ${trx.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                        trx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                    }`}>
                                    {trx.status.charAt(0).toUpperCase() + trx.status.slice(1)}
                                </span>
                            </div>

                            <hr className="my-4" />

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Tipe Kamar</p>
                                        <p className="font-medium">{trx.tipeKamar}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Nomor Kamar</p>
                                        <p className="font-medium">{trx.room?.roomNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Tamu</p>
                                        <p className="font-medium">{trx.nama}</p>
                                        <p className="text-sm">{trx.email} • {trx.noHp}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Check-in</p>
                                            <p className="font-medium">{new Date(trx.checkIn).toLocaleDateString('id-ID')}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Check-out</p>
                                            <p className="font-medium">{new Date(trx.checkOut).toLocaleDateString('id-ID')}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Harga</p>
                                        <p className="text-xl font-bold text-blue-600">
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
