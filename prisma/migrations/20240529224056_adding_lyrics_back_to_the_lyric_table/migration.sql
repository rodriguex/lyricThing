/*
  Warnings:

  - Added the required column `lyrics` to the `lyric` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lyric" ADD COLUMN     "lyrics" TEXT NOT NULL;
