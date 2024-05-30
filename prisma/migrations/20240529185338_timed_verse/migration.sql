/*
  Warnings:

  - You are about to drop the column `lyrics` on the `lyric` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lyric" DROP COLUMN "lyrics";

-- CreateTable
CREATE TABLE "timedVerse" (
    "id" SERIAL NOT NULL,
    "lyric_id" INTEGER NOT NULL,
    "verse" TEXT NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,

    CONSTRAINT "timedVerse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "timedVerse" ADD CONSTRAINT "timedVerse_lyric_id_fkey" FOREIGN KEY ("lyric_id") REFERENCES "lyric"("id") ON DELETE CASCADE ON UPDATE CASCADE;
