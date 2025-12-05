// web/app/layout.tsx
'use client'; // ← TAMBAHKAN INI karena SessionProvider adalah client component

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Metadata harus di client component dengan cara berbeda
// export const metadata: Metadata = { // ← HAPUS INI
//     title: "Your App",
//     description: "Your app description",
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>Your App</title>
                <meta name="description" content="Your app description" />
            </head>
            <body className={inter.className}>
                <SessionProvider>
                    <Navbar />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </SessionProvider>
            </body>
        </html>
    );
}