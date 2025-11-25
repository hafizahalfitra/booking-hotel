"use client"; // Diperlukan karena menggunakan hooks dan event handler

import { signIn } from "next-auth/react";

/**
 * Komponen tombol yang memicu alur otentikasi Google menggunakan NextAuth.js.
 */
export function LoginGoogleButton() {
  // Fungsi signIn akan mengarahkan pengguna ke '/api/auth/signin/google'
  const handleGoogleSignIn = () => {
    // Parameter pertama adalah ID provider (harus 'google' sesuai konfigurasi NextAuth)
    // Parameter kedua adalah opsi, bisa berisi callbackUrl
    signIn("google", { callbackUrl: "/" }); 
    // callbackUrl: "/" akan mengarahkan pengguna ke halaman utama setelah login berhasil
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {/* Anda bisa menambahkan logo Google di sini */}
      <img
        src="https://www.google.com/favicon.ico" // Gunakan icon Google yang sebenarnya
        alt="Google Logo"
        className="h-5 w-5 mr-2"
      />
      Sign In with Google
    </button>
  );
}