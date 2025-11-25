'use client'; // 🌟 HARUS ADA DI BARIS PERTAMA 🌟

import { LoginGoogleButton } from "@/components/login-button";
import { useSession, signOut } from "next-auth/react"; // 🌟 Wajib di-import

export default function SignInPage() {
    const { data: session, status } = useSession(); // Ambil data sesi

    // 1. Tampilkan loading
    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-xl">Memuat sesi...</p>
            </div>
        );
    }
    
    // 2. KONDISI: JIKA PENGGUNA SUDAH LOGIN (Tampilkan Profil)
    if (session) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow text-center">
                    <h1 className="text-3xl font-bold">Halo, {session.user?.name}!</h1>
                    {session.user?.image && ( // 👈 Menggunakan optional chaining (?) untuk keamanan
                        <img 
                            src={session.user.image} 
                            alt="Foto Profil" 
                            className="w-20 h-20 rounded-full mx-auto"
                        />
                    )}
                    <p className="text-gray-600">Anda berhasil masuk dengan {session.user?.email}.</p>
                    
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className='w-full bg-red-600 text-white font-medium py-3 px-6 rounded-sm hover:bg-red-700'
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }

    // 3. KONDISI: JIKA PENGGUNA BELUM LOGIN (Tampilkan Tombol Login)
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                
                <LoginGoogleButton />

                {/* Tautan ke backend auth */}
                <div className="text-center">
                    <a
                        href="http://localhost:3001/api/auth/signin"
                        className="text-blue-600 hover:underline" >
                        Or sign in directly via backend
                    </a>
                </div>
            </div>
        </div>
    );
}