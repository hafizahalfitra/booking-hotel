/*
  Warnings:

  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deskripsi` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `fotoUrls` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `hargaPerMalam` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `hotelId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `kapasitas` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `tipe` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `ukuran` on the `Room` table. All the data in the column will be lost.
  - The `id` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Hotel` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roomNumber]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `capacity` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomType` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_hotelId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
DROP COLUMN "deskripsi",
DROP COLUMN "fotoUrls",
DROP COLUMN "hargaPerMalam",
DROP COLUMN "hotelId",
DROP COLUMN "kapasitas",
DROP COLUMN "tipe",
DROP COLUMN "ukuran",
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "roomNumber" TEXT NOT NULL,
ADD COLUMN     "roomType" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Hotel";

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomNumber_key" ON "Room"("roomNumber");
