/*
  Warnings:

  - A unique constraint covering the columns `[internal_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "internal_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Post_internal_id_key" ON "Post"("internal_id");
