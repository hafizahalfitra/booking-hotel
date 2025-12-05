// web/app/providers.tsx
'use client';

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/navbar"; // atau "@/components/navbar/navbar"
import Footer from "@/components/footer"; // atau "@/components/footer/footer"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </SessionProvider>
  );
}