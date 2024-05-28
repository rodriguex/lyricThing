import Link from "next/link";
import Content from "../components/content";
import prisma from "../utils/prisma";
import { deleteLyric } from "../actions/lyrics";

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

      <div className="mt-14 flex flex-wrap gap-16">
        {lyrics.length ? (
          lyrics.map((lyric) => (
            <div
              key={lyric.id}
              className="h-fit flex flex-col items-center gap-4"
            >
              <div className="flex flex-col gap-3 self-start text-sm">
                <Link
                  href={`/lyrics/save?id=${lyric.id}`}
                  className="cursor-pointer"
                >
                  Update
                </Link>
                <form action={deleteLyric}>
                  <button>Delete</button>
                  <input type="hidden" name="id" value={lyric.id} />
                </form>
              </div>

              <Link href={`/lyrics/${lyric.id}`} className="flex flex-col">
                <div
                  style={{
                    backgroundImage: `url(${lyric.artist.profile_picture})`,
                  }}
                  className="w-48 h-48 bg-cover bg-center rounded-full"
                />
                <div className="mt-2 flex flex-col items-center gap-1">
                  <span className="font-bold text-lg">{`${lyric.artist.name} - ${lyric.song_name}`}</span>
                  <span>{lyric.released_at.toLocaleDateString()}</span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <span>no lyrics registerd yet</span>
        )}
      </div>
    </Content>
  );
}
