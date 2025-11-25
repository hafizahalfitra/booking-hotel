'use client'; // 🌟 Wajib: Digunakan untuk hook useSession

import { LoginGoogleButton } from "@/components/login-button";
import { useSession, signOut } from "next-auth/react"; // 🌟 Import hook dan fungsi signOut

export default function SignInPage() {
    const { data: session, status } = useSession(); // Ambil data sesi

    // Tampilkan loading saat sesi sedang diambil (status "loading")
    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-xl">Memuat sesi...</p>
            </div>
        );
    }
    
    // 🌟 KONDISI: JIKA PENGGUNA SUDAH LOGIN 🌟
    if (session) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow text-center">
                    <h1 className="text-3xl font-bold">Halo, {session.user.name}!</h1>
                    {session.user.image && (
                        <img 
                            src={session.user.image} 
                            alt="Foto Profil" 
                            className="w-20 h-20 rounded-full mx-auto" // Styling untuk gambar profil
                        />
                    )}
                    <p className="text-gray-600">Anda berhasil masuk dengan {session.user.email}.</p>
                    
                    {/* Tambahkan tombol Log Out */}
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })} // Log Out dan kembali ke halaman utama
                        className='w-full bg-red-600 text-white font-medium py-3 px-6 rounded-sm hover:bg-red-700'
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }

    // 🌟 KONDISI: JIKA PENGGUNA BELUM LOGIN 🌟
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                
                <LoginGoogleButton />

                {/* Tautan ke backend auth (Anda bisa menghapus blok ini jika tidak diperlukan) */}
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