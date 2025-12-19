// utils/prisma.ts

import { PrismaClient } from '@prisma/client';

// Tambahkan definisi global khusus untuk Next.js
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Gunakan instansi global jika sudah ada, atau buat yang baru
const prisma = global.prisma || new PrismaClient();

// Jika environment bukan produksi (dev), simpan instansi ke global
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;