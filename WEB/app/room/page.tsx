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

    const handleBooking = (room: Room) => {
        setSelectedRoom(room);
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

        const userStr = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!userStr || !token) {
            alert('Silakan login terlebih dahulu');
            router.push('/login');
            return;
        }

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
                resetForm();
                fetchRooms();
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

    const resetForm = () => {
        setSelectedRoom(null);
        setCheckIn('');
        setCheckOut('');
        setJumlahTamu(1);
        setNama('');
        setEmail('');
        setNoHp('');
    };

    const calculateDays = () => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    };

    const calculateTotal = () => {
        if (!selectedRoom) return 0;
        return selectedRoom.price * calculateDays();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl animate-pulse">Loading...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Pilih Kamar</h1>

            {rooms.length === 0 ? (
                <p className="text-center text-gray-500">Tidak ada kamar tersedia</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <div key={room.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
                            <div className="p-6">
                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">{room.roomType}</h2>
                                    <p className="text-gray-600">Nomor: {room.roomNumber}</p>
                                    {room.hotel && (
                                        <p className="text-sm text-blue-500 font-medium mt-1 uppercase tracking-wide">{room.hotel.nama}</p>
                                    )}
                                </div>

                                <div className="space-y-2 mb-6">
                                    <p className="flex justify-between">
                                        <span className="text-gray-600">Kapasitas:</span>
                                        <span className="font-semibold">{room.capacity} orang</span>
                                    </p>
                                    <p className="flex justify-between items-baseline">
                                        <span className="text-gray-600">Harga:</span>
                                        <span className="text-xl font-bold text-blue-600">
                                            Rp {room.price.toLocaleString('id-ID')}
                                        </span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`font-bold ${room.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                                            {room.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                                        </span>
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleBooking(room)}
                                    disabled={!room.isAvailable}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all active:scale-95"
                                >
                                    {room.isAvailable ? 'Pesan Sekarang' : 'Habis Terjual'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Booking - FIXED SCROLLABLE */}
            {selectedRoom && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-[#C2A895] rounded-2xl max-w-md w-full my-auto shadow-2xl relative flex flex-col max-h-[90vh]">
                        {/* Header Modal */}
                        <div className="p-6 border-b border-black/10 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">Konfirmasi Pesanan</h2>
                            <button onClick={resetForm} className="text-gray-700 hover:text-black text-2xl">×</button>
                        </div>

                        {/* Body Modal - Area Scroll */}
                        <div className="p-6 overflow-y-auto space-y-4 flex-grow">
                            <div className="bg-white/30 p-4 rounded-xl">
                                <p className="font-bold text-lg">{selectedRoom.roomType}</p>
                                <p className="text-sm text-gray-800">Room #{selectedRoom.roomNumber}</p>
                                <p className="text-blue-900 font-bold">Rp {selectedRoom.price.toLocaleString('id-ID')}/malam</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Check-in</label>
                                    <input
                                        type="date"
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full border-none rounded-lg px-3 py-2 shadow-inner"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Check-out</label>
                                    <input
                                        type="date"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        min={checkIn || new Date().toISOString().split('T')[0]}
                                        className="w-full border-none rounded-lg px-3 py-2 shadow-inner"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Jumlah Tamu</label>
                                <input
                                    type="number"
                                    value={jumlahTamu}
                                    onChange={(e) => setJumlahTamu(parseInt(e.target.value))}
                                    min="1"
                                    max={selectedRoom.capacity}
                                    className="w-full border-none rounded-lg px-3 py-2 shadow-inner"
                                />
                                <p className="text-[10px] text-gray-800 mt-1 italic">*Maksimal {selectedRoom.capacity} orang</p>
                            </div>

                            <hr className="border-black/10" />

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Nama Pemesan</label>
                                <input
                                    type="text"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    className="w-full border-none rounded-lg px-3 py-2 shadow-inner"
                                    placeholder="Sesuai KTP"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border-none rounded-lg px-3 py-2 shadow-inner"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">No. WhatsApp</label>
                                <input
                                    type="tel"
                                    value={noHp}
                                    onChange={(e) => setNoHp(e.target.value)}
                                    className="w-full border-none rounded-lg px-3 py-2 shadow-inner"
                                    placeholder="0812..."
                                />
                            </div>

                            {checkIn && checkOut && calculateDays() > 0 && (
                                <div className="bg-blue-900/10 p-4 rounded-xl border border-blue-900/20">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Durasi:</span>
                                        <span>{calculateDays()} Malam</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg text-blue-900">
                                        <span>Total:</span>
                                        <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Modal - Tetap di Bawah */}
                        <div className="p-6 border-t border-black/10 flex gap-3">
                            <button
                                onClick={resetForm}
                                className="flex-1 py-3 px-4 rounded-xl bg-black/10 text-gray-900 font-semibold hover:bg-black/20 transition-colors"
                                disabled={submitting}
                            >
                                Batal
                            </button>
                            <button
                                onClick={submitBooking}
                                disabled={submitting || !checkIn || !checkOut || calculateDays() === 0}
                                className="flex-[2] py-3 px-4 rounded-xl bg-blue-700 text-white font-bold hover:bg-blue-800 disabled:bg-blue-400 transition-all shadow-lg"
                            >
                                {submitting ? 'Mengirim...' : 'Konfirmasi Pesanan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && bookingSuccessData && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                    <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Pemesanan Sukses!</h3>
                        <p className="text-gray-500 mb-6 text-sm">Nomor pesanan Anda telah dicatat di sistem kami.</p>
                        <div className="bg-gray-50 rounded-2xl p-4 mb-8">
                            <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-widest">Total Bayar</p>
                            <p className="text-3xl font-black text-blue-600">
                                Rp {bookingSuccessData.totalPrice.toLocaleString('id-ID')}
                            </p>
                        </div>
                        <button
                            onClick={() => router.push('/transaksi')}
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
                        >
                            Cek Status Transaksi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}