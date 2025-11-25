import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import "./globals.css";
// 🌟 Langkah 1: Impor provider NextAuth 🌟
import { NextAuthProviders } from "./providers"; // Pastikan path ini benar

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Home",
  description: "Online Booking Hotel Bandar Lampung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} antialiased`}>
        
        {/* 🌟 Langkah 2: Bungkus seluruh aplikasi dengan provider 🌟 */}
        <NextAuthProviders>
          <Navbar />
          <main className="bg-gray-50 min-h-screen">{children}</main>
          <Footer />
        </NextAuthProviders>
        
      </body>
    </html>
  );
}