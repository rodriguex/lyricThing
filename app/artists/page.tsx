import Link from "next/link";
import Content from "../components/content";
import prisma from "../utils/prisma";

export default async function Page() {
  const artists = await prisma.artist.findMany();

  return (
    <Content>
      <div className="flex items-center justify-between gap-20">
        <h1 className="font-bold text-6xl">List of Artists</h1>
        <Link href="/artists/save" className="p-3 shadow rounded-lg">
          Add new Artist
        </Link>
      </div>

      <div className="mt-14 flex flex-wrap gap-8">
        {artists.length ? (
          artists.map((artist) => (
            <div className="border-2 w-[200px] h-[200px] flex flex-col items-center gap-3">
              <span className="text-lg">{artist.name}</span>
            </div>
          ))
        ) : (
          <span>no artists registerd yet</span>
        )}
      </div>
    </Content>
  );
}
