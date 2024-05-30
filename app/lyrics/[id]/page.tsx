import Content from "@/app/components/content";
import DynamicDateFormat from "@/app/components/lyrics/dynamicDateFormat";
import SyncedLyrics from "@/app/components/lyrics/synced-lyrics";
import prisma from "@/app/utils/prisma";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  let lyric: any = null;
  if (id) {
    lyric = await prisma.lyric.findFirst({
      where: { id: parseInt(id) },
      include: { artist: true, posted_by: true },
    });
  }

  if (!lyric) {
    return;
  }

  const verses = await prisma.timedVerse.findMany({
    where: { lyric_id: lyric.id },
    orderBy: { id: "asc" },
  });

  return (
    <Content classes="p-10 w-full max-w-[1700px]">
      <div className="flex items-center gap-20">
        <Link href={`/artists/${lyric.artist?.id}`}>
          <div
            style={{
              backgroundImage: `url('${process.env.NEXT_PUBLIC_BUCKET_URL}/${lyric?.artist?.profile_picture}')`,
            }}
            className="w-64 h-64 bg-cover bg-center rounded-full"
          />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <Link
              href={`/artists/${lyric.artist?.id}`}
              className="font-bold text-4xl hover:underline hover:cursor-pointer"
            >
              {lyric.artist?.name}
            </Link>
            <span className="font-bold text-4xl">{` - ${lyric.song_name}`}</span>
          </div>
          <DynamicDateFormat classes="mt-3" date={lyric.released_at as Date} />
          <span>{`Posted by: ${lyric.posted_by?.first_name} ${lyric.posted_by?.last_name}`}</span>
          <Link
            className="block mt-3 font-bold border-2 border-black p-2 rounded w-[150px] text-center"
            href={`/lyrics/save/verses/${lyric.id}`}
          >
            Edit Verses
          </Link>
        </div>
      </div>

      <SyncedLyrics verses={verses} song={lyric} />
    </Content>
  );
}
