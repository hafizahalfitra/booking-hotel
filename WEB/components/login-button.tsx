'use client';

import { signIn } from "next-auth/react";
import { FaG } from "react-icons/fa6";

export const LoginGoogleButton = () => {
    const handleSignIn = () => {
        signIn("google", { callbackUrl: "/" });
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
};