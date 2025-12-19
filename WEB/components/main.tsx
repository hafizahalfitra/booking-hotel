"use client";

import { useEffect, useState } from "react";
import Card from "@/components/card";

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

const Main = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/hotels');
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    if (loading) {
        return (
            <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
            <div className="grid gap-7 md:grid-cols-3">
                {hotels.map((hotel) => (
                    <Card key={hotel.id} hotel={hotel} />
                ))}
            </div>
        </div>
    );
};

export default Main;