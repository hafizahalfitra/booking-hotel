// app/login/page.tsx
"use client";

/**
 * Komponen Login Page:
 * Menggunakan Client Component karena membutuhkan interaksi user (OAuth)
 * dan akses ke browser API (localStorage/cookies via zustand).
 */
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// ikut struktur projectmu: src/lib & src/store
import { loginWithGoogleToken } from "../../src/lib/auth";
import { useAuth } from "../../src/store/auth";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuth((s) => s.setUser);

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  // pastikan ini ada di .env.local:
  // NEXT_PUBLIC_GOOGLE_CLIENT_ID=...

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-semibold mb-2">Login ke Akun Kamu</h1>
        <p className="text-gray-600 mb-4 text-sm">
          Silakan login menggunakan akun Google.
        </p>

        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const token = credentialResponse.credential;
              if (!token) {
                toast.error("Token Google tidak ditemukan");
                return;
              }

              // call backend → dapat user + token
              const data = await loginWithGoogleToken(token);

              // simpan ke global store (Navlink akan ganti jadi foto Google)
              setUser(data.user);

              // notifikasi cakep
              toast.success("Berhasil login! Selamat datang", {
                style: {
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "14px",
                },
              });

              // langsung lempar ke HOME (app/page.tsx = "/")
              router.push("/");
            } catch (err: any) {
              console.error(err);
              toast.error(err.message || "Login gagal, coba lagi.");
            }
          }}
          onError={() => {
            toast.error("Login Google gagal, coba lagi.");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
