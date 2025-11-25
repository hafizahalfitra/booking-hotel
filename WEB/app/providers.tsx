// prividers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export function NextAuthProviders({ children }: { children: React.ReactNode }) {
  // SessionProvider harus membungkus semua komponen yang menggunakan NextAuth.js
  return <SessionProvider>{children}</SessionProvider>;
}