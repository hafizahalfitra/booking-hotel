import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Semua properti konfigurasi Next.js Anda ditempatkan di sini.

  // Menggabungkan konfigurasi 'experimental' dari versi HEAD
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },

  // Konfigurasi untuk Next.js Image component
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: '**.imagekit.io',
      },
    ],
  },
};

export default nextConfig;