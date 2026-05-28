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
