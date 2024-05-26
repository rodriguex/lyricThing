import prisma from "@/app/utils/prisma";
import { utapi } from "@/server/uploadthing";

export async function POST(req: Request) {
  const { fileId, artistId } = await req.json();
  await utapi.deleteFiles(fileId);

  await prisma.artist.update({
    data: { profile_picture: "" },
    where: { id: artistId },
  });

  return new Response("");
}
