/*
  Warnings:

  - You are about to drop the column `memberId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_memberId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "memberId";

-- CreateTable
CREATE TABLE "_MemberToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToProject_AB_unique" ON "_MemberToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToProject_B_index" ON "_MemberToProject"("B");

-- AddForeignKey
ALTER TABLE "_MemberToProject" ADD CONSTRAINT "_MemberToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToProject" ADD CONSTRAINT "_MemberToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
