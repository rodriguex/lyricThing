import Content from "@/app/components/content";
import DynamicDateFormat from "@/app/components/lyrics/dynamicDateFormat";
import { Lyric } from "@/app/types";
import { formatDate } from "@/app/utils/helpers";
import prisma from "@/app/utils/prisma";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  let lyric: Lyric | null = null;
  if (id) {
    lyric = await prisma.lyric.findFirst({
      where: { id: parseInt(id) },
      include: { artist: true, posted_by: true },
    });
  }

  if (!lyric) {
    return;
  }

  const videoId = lyric.youtube_link.split("v=")[1].split("&")[0];

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
        </div>
      </div>

      <div className="flex justify-between">
        <p className="mt-20 ml-4 text-lg whitespace-pre-line">{lyric.lyrics}</p>
        <iframe
          className="mt-10 rounded-lg sticky top-[100px]"
          src={`https://www.youtube.com/embed/${videoId}`}
          width="500"
          height="300"
        />
      </div>
    </Content>
  );
}
