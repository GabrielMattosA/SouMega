-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBRO', 'DIRETOR', 'PRESIDENTE');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "rga" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member_rga_key" ON "Member"("rga");
