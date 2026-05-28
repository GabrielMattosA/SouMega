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
