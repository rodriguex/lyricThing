import Link from "next/link";
import Content from "../components/content";
import prisma from "../utils/prisma";
import { deleteArtist } from "../actions/artists";

export default async function Page() {
  const artists = await prisma.artist.findMany();

  return (
    <Content classes="p-10 w-full max-w-[1700px] flex flex-wrap gap-8">
      <div className="w-full flex items-center justify-between gap-20">
        <h1 className="font-bold text-6xl">List of Artists</h1>
        <Link href="/artists/save" className="p-3 shadow rounded-lg">
          Add new Artist
        </Link>
      </div>

      <div className="mt-14 flex flex-wrap gap-12">
        {artists.length ? (
          artists.map((artist) => (
            <div
              key={artist.id}
              className="rounded-xl p-5 h-fit flex flex-col items-center gap-4"
            >
              <div className="flex flex-col gap-3 self-start text-sm">
                <Link
                  href={`/artists/save?id=${artist.id}`}
                  className="cursor-pointer"
                >
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
                <span className="text-xl font-bold text-gray-600">
                  {artist.name}
                </span>
              </Link>
            </div>
          ))
        ) : (
          <span>no artists registerd yet</span>
        )}
      </div>
    </Content>
  );
}
