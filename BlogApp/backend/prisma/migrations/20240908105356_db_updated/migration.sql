/*
  Warnings:

  - You are about to drop the column `content` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "content",
ADD COLUMN     "body" TEXT[],
ADD COLUMN     "conclusion" TEXT,
ADD COLUMN     "introduction" TEXT,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "comments" SET DEFAULT ARRAY[]::TEXT[];
