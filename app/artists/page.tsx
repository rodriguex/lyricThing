import Link from "next/link";
import Content from "../components/content";
import prisma from "../utils/prisma";
import ShowArtists from "../components/artists/show-artists";

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

      <ShowArtists artists={artists} />
    </Content>
  );
}
