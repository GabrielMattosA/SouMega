/*
  Warnings:

  - You are about to drop the column `descricao` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `prazo` on the `Project` table. All the data in the column will be lost.
  - Added the required column `deployLink` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `githubLink` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "cargo" DROP NOT NULL,
ALTER COLUMN "diretoria" DROP NOT NULL,
ALTER COLUMN "time" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "descricao",
DROP COLUMN "name",
DROP COLUMN "prazo",
ADD COLUMN     "deployLink" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "githubLink" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
