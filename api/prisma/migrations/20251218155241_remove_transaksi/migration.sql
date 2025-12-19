/*
  Warnings:

  - You are about to drop the `Transaksi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaksi" DROP CONSTRAINT "Transaksi_roomId_fkey";

-- DropTable
DROP TABLE "Transaksi";
