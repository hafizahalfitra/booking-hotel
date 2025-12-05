'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
    const { data: session, status } = useSession();

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link href="/">Your Logo</Link>
                </div>
                
                <div className="flex items-center gap-4">
                    {status === "loading" ? (
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                    ) : session ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                {session.user?.image && (
                                    <img 
                                        src={session.user.image} 
                                        alt="Profile" 
                                        className="w-8 h-8 rounded-full"
                                    />
                                )}
                                <span className="hidden md:inline text-sm">
                                    {session.user?.name}
                                </span>
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn("google", { callbackUrl: '/' })}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}