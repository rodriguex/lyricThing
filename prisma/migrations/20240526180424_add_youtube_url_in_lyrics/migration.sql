/*
  Warnings:

  - Added the required column `youtube_link` to the `lyric` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lyric" ADD COLUMN     "youtube_link" TEXT NOT NULL;
