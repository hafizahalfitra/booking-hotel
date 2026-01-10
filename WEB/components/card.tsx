"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    IoPeopleOutline,
    IoLocationOutline,
    IoStarSharp,
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

    // Ambil harga termurah dari rooms yang available
    const availableRooms = hotel.rooms.filter((room) => room.isAvailable);
    const minPrice =
        availableRooms.length > 0
            ? Math.min(...availableRooms.map((room) => room.price))
            : 0;

    // Ambil kapasitas maksimal
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
        <div
            className="bg-white rounded-xl overflow-hidden
      shadow-md hover:shadow-xl transition-all duration-300"
        >
            {/* IMAGE */}
            <div className="relative h-[260px]">
                <Image
                    src={hotel.thumbnailUrl || "/standar-room.jpeg"}
                    width={384}
                    height={256}
                    alt={hotel.nama}
                    className="w-full h-full object-cover"
                />

                {hotel.rating && (
                    <div
                        className="absolute top-4 left-4 flex items-center gap-1
            bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow"
                    >
                        <IoStarSharp className="text-yellow-500" />
                        <span className="text-sm font-semibold">{hotel.rating}</span>
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-6 md:p-7">
                {/* Nama & Lokasi */}
                <div className="mb-4">
                    <h4
                        className="text-xl md:text-2xl font-semibold
            text-gray-800 leading-snug"
                    >
                        {hotel.nama}
                    </h4>

                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                        <IoLocationOutline />
                        <span>{hotel.alamat}</span>
                    </div>
                </div>

                {/* Harga */}
                <div className="flex items-end gap-1 mb-6">
                    <span className="text-2xl font-bold text-gray-700">
                        Rp {minPrice.toLocaleString("id-ID")}
                    </span>
                    <span className="text-sm text-gray-400 mb-0.5">/ malam</span>
                </div>

                {/* Footer Card */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <IoPeopleOutline className="text-lg" />
                        <span>{maxCapacity} Orang</span>
                    </div>

                    <button
                        onClick={handleBooking}
                        className="px-6 py-2.5 md:px-8
            text-sm md:text-base font-semibold text-white
            bg-[#C2A895] rounded-lg
            hover:bg-[#b39683]
            transition-all duration-200
            active:scale-95"
                    >
                        Pesan Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
