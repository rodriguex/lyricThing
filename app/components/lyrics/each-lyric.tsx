import Link from "next/link";
import { Lyric } from "@/app/types";
import { deleteLyric } from "@/app/actions/lyrics";

export default function EachLyric({ lyric }: { lyric: Lyric }) {
  return (
    <div key={lyric.id} className="h-fit flex flex-col items-center gap-4">
      <div className="flex flex-col gap-3 self-start text-sm">
        <Link href={`/lyrics/save?id=${lyric.id}`} className="cursor-pointer">
          Update
        </Link>
        <form action={deleteLyric}>
          <button>Delete</button>
          <input type="hidden" name="id" value={lyric.id} />
        </form>
      </div>

      <Link href={`/lyrics/${lyric.id}`} className="flex flex-col items-center">
        <div
          style={{
            backgroundImage: `url('${lyric.artist?.profile_picture}')`,
          }}
          className="w-48 h-48 bg-cover bg-center rounded-full"
        />
        <div className="mt-2 flex flex-col items-center gap-1">
          <span className="font-bold text-lg">{`${lyric?.artist?.name} - ${lyric.song_name}`}</span>
        </div>
      </Link>
    </div>
  );
}
