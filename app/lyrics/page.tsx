import Link from "next/link";
import Content from "../components/content";
import prisma from "../utils/prisma";
import ShowLyrics from "../components/show-lyrics";

export default async function Page() {
  const lyrics = await prisma.lyric.findMany({
    include: {
      artist: true,
      posted_by: true,
    },
  });

  return (
    <Content classes="p-10 w-full max-w-[1700px] flex flex-wrap gap-8">
      <div className="w-full flex items-center justify-between gap-20">
        <h1 className="font-bold text-6xl">List of Lyrics</h1>
        <Link href="/lyrics/save" className="p-3 shadow rounded-lg">
          Add new lyric
        </Link>
      </div>
      <ShowLyrics lyrics={lyrics} />
    </Content>
  );
}
