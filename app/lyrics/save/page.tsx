import Content from "@/app/components/content";
import SaveLyricForm from "@/app/components/artists/save-lyric-form";
import { Artist, Lyric } from "@/app/types";
import prisma from "@/app/utils/prisma";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let artists: Artist[] | [] = await prisma.artist.findMany();

  let lyric: Lyric | null = null;
  if (searchParams?.id) {
    lyric = await prisma.lyric.findFirst({
      where: { id: parseInt(searchParams.id) },
    });

    if (lyric) {
      lyric.released_at = `${new Date(
        lyric.released_at
      ).getFullYear()}-${new Date(lyric.released_at)
        .getMonth()
        .toString()
        .padStart(2, "0")}-${new Date(lyric.released_at)
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    }
  }

  return (
    <Content classes="w-fit p-10 flex flex-col items-center">
      <h1 className="font-bold text-6xl">
        {lyric ? "Update a lyric" : "Add a new lyric"}
      </h1>
      <span className="text-gray-400 text-sm font-semibold">
        {lyric ? "Update" : "Register"} an artist and start singing the popular
        hits!
      </span>
      <SaveLyricForm updatingLyric={lyric} artists={artists} />
    </Content>
  );
}
