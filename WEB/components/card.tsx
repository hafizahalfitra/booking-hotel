"use client";

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { IoPeopleOutline, IoLocationOutline, IoStarSharp } from "react-icons/io5"
import { useAuth } from "@/src/store/auth"

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
    const availableRooms = hotel.rooms.filter(room => room.isAvailable);
    const minPrice = availableRooms.length > 0
        ? Math.min(...availableRooms.map(room => room.price))
        : 0;

    // Ambil kapasitas maksimal
    const maxCapacity = availableRooms.length > 0
        ? Math.max(...availableRooms.map(room => room.capacity))
        : 0;

    const handleBooking = () => {
        if (!user) {
            router.push('/login');
        } else {
            router.push(`/room?hotelId=${hotel.id}`);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-sm transition duration-100 hover:shadow-sm">
            <div className="h-[260px] w-auto rounded-t-sm relative">
                <Image
                    src={hotel.thumbnailUrl || "/standar-room.jpeg"}
                    width={384}
                    height={256}
                    alt={hotel.nama}
                    className="w-full h-full object-cover rounded-t-sm"
                />
            </div>
            <div className="p-8">
                {/* Nama Hotel dan Lokasi */}
                <div className="mb-4">
                    <h4 className="text-2xl font-medium">
                        <span className="hover:text-gray-800 transition duration-150">
                            {hotel.nama}
                        </span>
                    </h4>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                        <IoLocationOutline className="mr-1" />
                        <span>{hotel.alamat}</span>
                    </div>
                    {hotel.rating && (
                        <div className="flex items-center mt-2">
                            <IoStarSharp className="text-yellow-500 mr-1" />
                            <span className="text-sm font-semibold">{hotel.rating}</span>
                        </div>
                    )}
                </div>

                <h4 className="text-2xl mb-7">
                    <span className="font-semibold text-gray-600">
                        Rp {minPrice.toLocaleString('id-ID')}
                    </span>
                    <span className="text-gray-400 text-sm">/malam</span>
                </h4>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <IoPeopleOutline />
                        <span>{maxCapacity} Orang</span>
                    </div>
                    <button
                        onClick={handleBooking}
                        className="px-6 py-2.5 md:px-10 md:py-3 font-semibold text-white
                        bg-[#C2A895] rounded-md hover:bg-[#b39683] transition-all duration-200
                        shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                    >
                        Pesan Sekarang
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card