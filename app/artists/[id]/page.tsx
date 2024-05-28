import { Artist } from "@/app/types";
import prisma from "@/app/utils/prisma";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  let artist: Artist | null = null;
  if (id) {
    artist = await prisma.artist.findFirst({ where: { id: parseInt(id) } });
  }

  if (!artist) {
    return;
  }

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${artist.profile_picture})` }}
        className={"w-full h-[500px] bg-black bg-cover bg-center"}
      />
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-6xl">{artist.name}</h1>
        <span>{artist.about}</span>
      </div>

      <div className="mt-20">
        <h2 className="font-bold text-4xl">Lyrics</h2>
      </div>
    </div>
  );
}
