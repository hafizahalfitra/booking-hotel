/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Transaksi` table. All the data in the column will be lost.
  - Added the required column `email` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlahTamu` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noHp` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipeKamar` to the `Transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaksi" DROP COLUMN "userEmail",
DROP COLUMN "userName",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "jumlahTamu" INTEGER NOT NULL,
ADD COLUMN     "nama" TEXT NOT NULL,
ADD COLUMN     "noHp" TEXT NOT NULL,
ADD COLUMN     "tipeKamar" TEXT NOT NULL;
