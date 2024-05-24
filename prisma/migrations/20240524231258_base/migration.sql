-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "profile_picture" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artist" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "profile_picture" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lyric" (
    "id" SERIAL NOT NULL,
    "song_name" VARCHAR(255) NOT NULL,
    "released_at" DATE NOT NULL,
    "lyrics" TEXT NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "posted_by_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lyric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "artist_name_key" ON "artist"("name");

-- AddForeignKey
ALTER TABLE "lyric" ADD CONSTRAINT "lyric_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lyric" ADD CONSTRAINT "lyric_posted_by_id_fkey" FOREIGN KEY ("posted_by_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
