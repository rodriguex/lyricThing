import { deleteArtist } from "@/app/actions/artists";
import { Artist } from "@/app/types";
import Link from "next/link";

export default function EachArtist({ artist }: { artist: Artist }) {
  return (
    <div
      key={artist.id}
      className="rounded-xl p-5 h-fit flex flex-col items-center gap-4"
    >
      <div className="flex flex-col gap-3 self-start text-sm">
        <Link href={`/artists/save?id=${artist.id}`} className="cursor-pointer">
          Update
        </Link>
        <form action={deleteArtist}>
          <button>Delete</button>
          <input type="hidden" name="id" value={artist.id} />
        </form>
      </div>

      <Link
        href={`/artists/${artist.id}`}
        className="flex flex-col items-center gap-3"
      >
        <div
          style={{
            backgroundImage: `url('${process.env.NEXT_PUBLIC_BUCKET_URL}/${artist.profile_picture}')`,
          }}
          className="w-52 h-52 bg-cover bg-center rounded-full"
        />
        <span className="text-xl font-bold text-gray-600">{artist.name}</span>
      </Link>
    </div>
  );
}
