// pages/api/hotels.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma'; // Sesuaikan path jika berbeda

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Cek apakah method request adalah GET
  if (req.method === 'GET') {
    try {
      const hotels = await prisma.hotel.findMany({
        include: {
          rooms: true,
        },
      });

      // Response 200 OK dengan data hotel
      return res.status(200).json(hotels);
    } catch (error) {
      console.error(error);
      // Response 500 Internal Server Error
      return res.status(500).json({ message: 'Gagal mengambil data hotel.' });
    }
  }

  // Jika method bukan GET, kembalikan 405 Method Not Allowed
  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}