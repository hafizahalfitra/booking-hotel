'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Navlink from "@/components/navbar/navlink";

// Definisikan tipe untuk user
interface User {
  name?: string;
  email?: string;
  image?: string;
}

const Navbar = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const checkSession = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/session', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    setUser(data.user);
                }
            }
        } catch (error) {
            console.error('Error fetching session:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3001/api/auth/signout', {
                method: 'POST',
                credentials: 'include',
            });
            setUser(null);
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className='fixed top-0 w-full bg-white shadow-sm z-20'>
            <div className='max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4'>
                <Link href="/">
                    <Image 
                        src="/logo.png" 
                        alt="logo" 
                        width={128} 
                        height={49} 
                        priority 
                    />
                </Link>
                
                <div className="flex items-center gap-4">
                    <Navlink />
                    
                    {loading ? (
                        <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                {user.image && (
                                    <img 
                                        src={user.image} 
                                        alt="Profile" 
                                        className="w-8 h-8 rounded-full"
                                    />
                                )}
                                <span className="hidden md:inline text-sm">
                                    {user.name || user.email}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link 
                            href="/signin"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;