/*
  Warnings:

  - You are about to drop the column `isLiked` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "isLiked";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "_Likes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Likes_AB_unique" ON "_Likes"("A", "B");

-- CreateIndex
CREATE INDEX "_Likes_B_index" ON "_Likes"("B");

-- AddForeignKey
ALTER TABLE "_Likes" ADD CONSTRAINT "_Likes_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Likes" ADD CONSTRAINT "_Likes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
