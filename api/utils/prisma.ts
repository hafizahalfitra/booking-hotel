// utils/prisma.ts

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Tambahkan definisi global khusus untuk Next.js
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Buat adapter untuk PostgreSQL (required di Prisma 7)
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

// Gunakan instansi global jika sudah ada, atau buat yang baru dengan adapter
const prisma = global.prisma || new PrismaClient({ adapter });

// Jika environment bukan produksi (dev), simpan instansi ke global
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;