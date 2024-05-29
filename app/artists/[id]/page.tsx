import Content from "@/app/components/content";
import DynamicDateFormat from "@/app/components/lyrics/dynamicDateFormat";
import { ShowArtist } from "@/app/types";
import prisma from "@/app/utils/prisma";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  let artist: ShowArtist | null = null;
  if (id) {
    artist = await prisma.artist.findFirst({
      where: { id: parseInt(id) },
      include: { lyric: { include: { posted_by: true } } },
    });
  }

  if (!artist) {
    return;
  }

  return (
    <Content classes="p-10 w-full max-w-[1700px]">
      <div className="flex items-center gap-20">
        <div
          style={{
            backgroundImage: `url('${process.env.NEXT_PUBLIC_BUCKET_URL}/${artist.profile_picture}')`,
          }}
          className="w-80 h-80 bg-cover bg-center rounded-full"
        ></div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-5xl">{artist.name}</h1>
          <span className="text-lg text-gray-500">{artist.about}</span>
        </div>
      </div>

      <div className="mt-20 ml-6">
        <h2 className="font-bold text-4xl">Lyrics</h2>
        <div className="mt-8 flex flex-wrap gap-10">
          {artist.lyric.length ? (
            artist.lyric.map((lyric) => (
              <Link
                href={`/lyrics/${lyric.id}`}
                key={lyric.id}
                className="border border-gray-300 p-5 rounded-xl cursor-pointer flex flex-col gap-1"
              >
                <span>{`Song: ${lyric.song_name}`}</span>
                <span>{`Posted by: ${lyric.posted_by?.first_name}`}</span>
                <DynamicDateFormat date={lyric.released_at as Date} />
              </Link>
            ))
          ) : (
            <div className="flex flex-col gap-5">
              <span>This artist has no lyrics yet :(</span>
              <Link
                href="/artists/save"
                className="font-bold text-xl border-2 border-black p-3 rounded"
              >
                Be the first one to add a lyric here
              </Link>
            </div>
          )}
        </div>
      </div>
    </Content>
  );
}
