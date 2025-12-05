import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Semua properti konfigurasi Next.js Anda ditempatkan di sini.
  
  // Menggabungkan konfigurasi 'experimental' dari versi HEAD
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  
  // Anda bisa menambahkan konfigurasi lain di sini,
  // misalnya: output: 'standalone', images: { domains: [...] }
};

export default nextConfig;

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*', // Proxy to Backend
      },
    ];
  },
};