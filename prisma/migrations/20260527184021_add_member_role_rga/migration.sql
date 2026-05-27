/*
  Warnings:

  - A unique constraint covering the columns `[rga]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rga` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBRO', 'DIRETOR', 'PRESIDENTE');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "rga" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member_rga_key" ON "Member"("rga");
