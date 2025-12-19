'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Room {
    id: number;
    roomNumber: string;
    roomType: string;
    price: number;
    isAvailable: boolean;
    capacity: number;
    hotel: {
        id: number;
        nama: string;
        alamat: string;
        deskripsi: string;
        rating: number;
        thumbnailUrl: string;
    };
}

export default function RoomPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const hotelId = searchParams.get('hotelId');

    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [jumlahTamu, setJumlahTamu] = useState(1);
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [noHp, setNoHp] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [bookingSuccessData, setBookingSuccessData] = useState<{ totalPrice: number } | null>(null);

    useEffect(() => {
        fetchRooms();
    }, [hotelId]);

    const fetchRooms = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/rooms`);
            const data = await response.json();

            // Filter berdasarkan hotelId jika ada
            const filteredRooms = hotelId
                ? data.filter((room: Room) => room.hotel?.id === parseInt(hotelId))
                : data;

            setRooms(filteredRooms);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (room: Room) => {
        setSelectedRoom(room);

        // Prefill user data if available
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setNama(user.name || '');
            setEmail(user.email || '');
        }
    };

    const submitBooking = async () => {
        if (!selectedRoom || !checkIn || !checkOut || !nama || !email || !noHp) {
            alert('Mohon lengkapi semua data pemesanan');
            return;
        }

        // Ambil data user dari localStorage
        const userStr = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!userStr || !token) {
            alert('Silakan login terlebih dahulu');
            router.push('/login');
            return;
        }

        const user = JSON.parse(userStr);

        setSubmitting(true);
        try {
            const response = await fetch('http://localhost:3001/api/transaksi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    roomId: selectedRoom.id,
                    checkIn,
                    checkOut,
                    jumlahTamu,
                    nama,
                    email,
                    noHp
                })
            });

            if (response.ok) {
                const data = await response.json();
                setBookingSuccessData(data);
                setShowSuccessModal(true);

                // Reset form
                setSelectedRoom(null);
                setCheckIn('');
                setCheckOut('');
                setJumlahTamu(1);
                setNama('');
                setEmail('');
                setNoHp('');
                fetchRooms();

                // Optional: Auto redirect after few seconds, or let user click button
                // setTimeout(() => {
                //      router.push('/transaksi');
                // }, 3000);
            } else {
                const error = await response.json();
                alert(`Pemesanan gagal: ${error.error}`);
            }
        } catch (error) {
            console.error('Error booking:', error);
            alert('Terjadi kesalahan saat memesan');
        } finally {
            setSubmitting(false);
        }
    };

    const calculateDays = () => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    };

    const calculateTotal = () => {
        if (!selectedRoom) return 0;
        return selectedRoom.price * calculateDays();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Pilih Kamar</h1>

            {rooms.length === 0 ? (
                <p className="text-center text-gray-500">Tidak ada kamar tersedia</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <div key={room.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                            <div className="p-6">
                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold">{room.roomType}</h2>
                                    <p className="text-gray-600">Nomor: {room.roomNumber}</p>
                                    {room.hotel && (
                                        <p className="text-sm text-gray-500 mt-2">{room.hotel.nama}</p>
                                    )}
                                </div>

                                <div className="space-y-2 mb-4">
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold">Kapasitas:</span>
                                        <span>{room.capacity} orang</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold">Harga:</span>
                                        <span className="text-xl text-blue-600">
                                            Rp {room.price.toLocaleString('id-ID')}/malam
                                        </span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold">Status:</span>
                                        <span className={room.isAvailable ? 'text-green-600' : 'text-red-600'}>
                                            {room.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                                        </span>
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleBooking(room)}
                                    disabled={!room.isAvailable}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {room.isAvailable ? 'Pesan Sekarang' : 'Tidak Tersedia'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Booking */}
            {selectedRoom && (
                <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-[#C2A895] rounded-lg max-w-md w-full p-6">
                        <h2 className="text-2xl font-bold mb-4">Pesan Kamar</h2>

                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold">{selectedRoom.roomType}</p>
                                <p className="text-gray-600">Nomor: {selectedRoom.roomNumber}</p>
                                <p className="text-blue-600">Rp {selectedRoom.price.toLocaleString('id-ID')}/malam</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Check-in</label>
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Check-out</label>
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    min={checkIn || new Date().toISOString().split('T')[0]}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Jumlah Tamu</label>
                                <input
                                    type="number"
                                    value={jumlahTamu}
                                    onChange={(e) => setJumlahTamu(parseInt(e.target.value))}
                                    min="1"
                                    max={selectedRoom.capacity}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                                <p className="text-xs text-gray-500 mt-1">Maksimal: {selectedRoom.capacity} orang</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    placeholder="Nama Lengkap"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@contoh.com"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">No. HP</label>
                                <input
                                    type="tel"
                                    value={noHp}
                                    onChange={(e) => setNoHp(e.target.value)}
                                    placeholder="08xxxxxxxxxx"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            {checkIn && checkOut && (
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Lama menginap: {calculateDays()} malam</p>
                                    <p className="text-lg font-bold text-blue-600">
                                        Total: Rp {calculateTotal().toLocaleString('id-ID')}
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setSelectedRoom(null);
                                        setCheckIn('');
                                        setCheckOut('');
                                        setJumlahTamu(1);
                                        setNama('');
                                        setEmail('');
                                        setNoHp('');
                                    }}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                                    disabled={submitting}
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={submitBooking}
                                    disabled={submitting || !checkIn || !checkOut}
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                                >
                                    {submitting ? 'Memproses...' : 'Konfirmasi'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Success Modal */}
            {showSuccessModal && bookingSuccessData && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-8 shadow-2xl scale-100 transform transition-all text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Berhasil!</h3>
                        <p className="text-gray-600 mb-6">
                            Terima kasih telah melakukan pemesanan.
                        </p>

                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-500 mb-1">Total Pembayaran</p>
                            <p className="text-2xl font-bold text-blue-600">
                                Rp {bookingSuccessData.totalPrice.toLocaleString('id-ID')}
                            </p>
                        </div>

                        <button
                            onClick={() => router.push('/transaksi')}
                            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-blue-500/30"
                        >
                            Lihat Pesanan Saya
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
