import Content from "@/app/components/content";
import SaveArtistForm from "@/app/components/save-artist-form";
import { Artist } from "@/app/types";
import prisma from "@/app/utils/prisma";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let artist: Artist | null = null;
  if (searchParams?.id) {
    artist = await prisma.artist.findFirst({
      where: { id: parseInt(searchParams.id) },
    });
  }

  return (
    <Content classes="w-fit flex flex-col items-center p-10">
      <h1 className="font-bold text-6xl">
        {artist ? "Update an artist" : "Add a new artist"}
      </h1>
      <span className="text-gray-400 text-sm font-semibold">
        {artist ? "Update" : "Register"} an artist and start rocking with
        popular hits!
      </span>
      <SaveArtistForm updatingArtist={artist} />
    </Content>
  );
}
