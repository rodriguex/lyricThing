"use server";

import { redirect } from "next/navigation";
import prisma from "../utils/prisma";
import { revalidatePath } from "next/cache";
import { Lyric } from "../types";
import { auth } from "@clerk/nextjs/server";

export async function createLyric(form: FormData) {
  // const user = auth();
  // if (!user?.userId) {
  //   return;
  // }

  // const getLoggedUserId = await prisma.user.findFirst({
  //   where: { email: "gustardn@gmail.com" },
  // });
  // if (!getLoggedUserId) {
  //   return;
  // }

  const lyricId = form.get("id") as string;
  const songName = form.get("songName") as string;
  const releasedAt = form.get("releasedAt") as string;
  const youtubeLink = form.get("youtubeLink") as string;
  const lyrics = form.get("lyrics") as string;
  const artistId = form.get("artist") as string;

  let getLyric: Lyric | null = null;
  if (lyricId) {
    getLyric = await prisma.lyric.findFirst({
      where: { id: parseInt(lyricId) },
    });
  }

  const lyric = {
    song_name: songName,
    released_at: new Date(releasedAt).toISOString(),
    youtube_link: youtubeLink,
    lyrics,
    // posted_by_id: getLoggedUserId?.id,
    posted_by_id: 1,
    artist_id: parseInt(artistId),
  };

  if (!getLyric) {
    await prisma.lyric.create({ data: lyric });
  } else {
    await prisma.lyric.update({
      data: lyric,
      where: { id: parseInt(lyricId) },
    });
  }

  redirect("/lyrics");
}

export async function deleteLyric(form: FormData) {
  const id = form.get("id") as string;

  const lyric = await prisma.lyric.findFirst({ where: { id: parseInt(id) } });
  if (lyric) {
    await prisma.lyric.delete({ where: { id: parseInt(id) } });
    revalidatePath("/lyrics");
  }
}
