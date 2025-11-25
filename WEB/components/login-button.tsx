'use client';

import { FaG } from "react-icons/fa6";

export const LoginGoogleButton = () => {
    const handleSignIn = () => {
        window.location.href = "http://localhost:3001/api/auth/signin";
    };

    return (
        <button
            onClick={handleSignIn}
            className='flex items-center justify-center gap-2 w-full bg-blue-700 text-white
        font-medium py-3 px-6 text-base rounded-sm hover:bg-blue-600 cursor-pointer'
        >
            <FaG className="size-6" />
            Masuk Dengan Google
        </button>
    );
};'use client';

import { FaG } from "react-icons/fa6";
import { signIn } from "next-auth/react"; // 🌟 IMPOR FUNGSI signIn 🌟

export const LoginGoogleButton = () => {
    const handleSignIn = () => {
        // 🌟 Gunakan fungsi signIn NextAuth 🌟
        // 'google' adalah ID provider Anda.
        // callbackUrl: '/signin' akan mengarahkan pengguna kembali ke halaman ini (port 3000) setelah login berhasil.
        signIn('google', { callbackUrl: '/signin' });
    };

    return (
        <button
            onClick={handleSignIn} // Panggil fungsi signIn
            className='flex items-center justify-center gap-2 w-full bg-blue-700 text-white
        font-medium py-3 px-6 text-base rounded-sm hover:bg-blue-600 cursor-pointer'
        >
            <FaG className="size-6" />
            Masuk Dengan Google
        </button>
    );
};