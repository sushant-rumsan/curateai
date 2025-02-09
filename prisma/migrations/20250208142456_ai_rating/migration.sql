/*
  Warnings:

  - A unique constraint covering the columns `[aiRatingId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "aiRatingId" INTEGER,
ADD COLUMN     "userRating" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "AIPostRating" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" INTEGER NOT NULL,
    "sentimentAnalysisLabel" TEXT NOT NULL,
    "sentimentAnalysisScore" DOUBLE PRECISION NOT NULL,
    "biasDetectionScore" DOUBLE PRECISION NOT NULL,
    "biasDetectionDirection" TEXT NOT NULL,
    "originalityScore" DOUBLE PRECISION NOT NULL,
    "similarityScore" DOUBLE PRECISION NOT NULL,
    "readabilityFleschKincaid" DOUBLE PRECISION NOT NULL,
    "readabilityGunningFog" DOUBLE PRECISION NOT NULL,
    "mainTopic" TEXT NOT NULL,
    "secondaryTopics" TEXT[],

    CONSTRAINT "AIPostRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AIPostRating_postId_key" ON "AIPostRating"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_aiRatingId_key" ON "Post"("aiRatingId");

-- AddForeignKey
ALTER TABLE "AIPostRating" ADD CONSTRAINT "AIPostRating_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
