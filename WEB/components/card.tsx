"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    IoPeopleOutline,
    IoLocationOutline,
    IoStarSharp,
    IoArrowForwardOutline,
} from "react-icons/io5";
import { useAuth } from "@/src/store/auth";

interface Room {
    id: number;
    roomNumber: string;
    roomType: string;
    price: number;
    capacity: number;
    isAvailable: boolean;
}

interface Hotel {
    id: number;
    nama: string;
    alamat: string;
    deskripsi: string | null;
    rating: number | null;
    thumbnailUrl: string | null;
    rooms: Room[];
}

interface CardProps {
    hotel: Hotel;
}

const Card = ({ hotel }: CardProps) => {
    const { user } = useAuth();
    const router = useRouter();

    const availableRooms = hotel.rooms.filter((room) => room.isAvailable);
    const minPrice =
        availableRooms.length > 0
            ? Math.min(...availableRooms.map((room) => room.price))
            : 0;

    const maxCapacity =
        availableRooms.length > 0
            ? Math.max(...availableRooms.map((room) => room.capacity))
            : 0;

    const handleBooking = () => {
        if (!user) {
            router.push("/login");
        } else {
            router.push(`/room?hotelId=${hotel.id}`);
        }
    };

    return (
        <div className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
            
            {/* --- IMAGE SECTION --- */}
            <div className="relative h-[280px] overflow-hidden">
                <Image
                    src={hotel.thumbnailUrl || "/standar-room.jpeg"}
                    width={500}
                    height={400}
                    alt={hotel.nama}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Rating Badge */}
                {hotel.rating && (
                    <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/20">
                        <IoStarSharp className="text-[#C2A895] text-xs" />
                        <span className="text-xs font-bold text-gray-800">{hotel.rating}</span>
                    </div>
                )}

                {/* Status Available Badge */}
                <div className="absolute top-5 right-5">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border ${availableRooms.length > 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-rose-500/10 border-rose-500/20 text-rose-600'}`}>
                        {availableRooms.length > 0 ? 'Tersedia' : 'Penuh'}
                    </span>
                </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="p-8 flex flex-col flex-grow">
                {/* Alamat - Menggunakan Font Serif agar senada dengan Judul */}
                <div className="flex items-center gap-1.5 text-[#C2A895] mb-1">
                    <IoLocationOutline className="text-sm" />
                    <span className="font-serif italic text-sm tracking-wide">
                        {hotel.alamat.split(',')[0]}
                    </span>
                </div>

                {/* Nama Hotel */}
                <h4 className="text-2xl font-serif font-medium text-gray-900 mb-5 line-clamp-1 group-hover:text-[#C2A895] transition-colors">
                    {hotel.nama}
                </h4>

                {/* Fasilitas Singkat */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100">
                        <IoPeopleOutline className="text-gray-400 text-lg" />
                        <span className="text-xs font-semibold text-gray-600">Up to {maxCapacity} Guest</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="h-[1px] w-full bg-gray-100 mb-6" />

                    {/* Footer: Price & CTA */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Mulai Dari</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-gray-900 leading-none">
                                    Rp{minPrice.toLocaleString("id-ID")}
                                </span>
                                <span className="text-xs text-gray-400 font-medium">/night</span>
                            </div>
                        </div>

                        <button
                            onClick={handleBooking}
                            className="group/btn relative flex items-center justify-center w-14 h-14 bg-gray-900 rounded-2xl transition-all duration-300 hover:w-40 hover:bg-[#C2A895] active:scale-95 shadow-lg shadow-gray-200 text-white"
                        >
                            <div className="flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap px-4">
                                <span className="hidden group-hover/btn:block text-sm font-bold transition-all duration-500">Book Room</span>
                                <IoArrowForwardOutline className="text-xl shrink-0" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;