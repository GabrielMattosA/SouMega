/*
  Warnings:

  - You are about to drop the column `role` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - Added the required column `cargo` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diretoria` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prazo` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "role",
ADD COLUMN     "cargo" TEXT NOT NULL,
ADD COLUMN     "diretoria" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "prazo" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Role";
