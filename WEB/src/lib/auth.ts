// lib/auth.ts
export interface User {
  name: string;
  email: string;
  picture: string;
  verified: boolean;
}

interface LoginResponse {
  success: boolean;
  user: User;
  token: string;
  message?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export async function loginWithGoogleToken(
  googleIdToken: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/api/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: googleIdToken }),
  });

  const data = (await res.json()) as LoginResponse;

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Login gagal");
  }

  // Simpan ke localStorage untuk persistence
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  }

  return data;
}
