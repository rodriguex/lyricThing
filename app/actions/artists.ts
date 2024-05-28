"use server";

import { redirect } from "next/navigation";
import prisma from "../utils/prisma";
import { revalidatePath } from "next/cache";
import { utapi } from "@/server/uploadthing";
import { Artist } from "../types";

export async function createArtist(form: FormData) {
  const id = form.get("id") as string;
  const name = form.get("name") as string;
  const about = form.get("about") as string;
  const file = form.get("url") as string;

  let getUser: Artist | null = null;
  if (id) {
    getUser = await prisma.artist.findFirst({
      where: { id: parseInt(id) },
    });
  }

  const artist = { name, about, profile_picture: file };

  if (!getUser) {
    await prisma.artist.create({ data: artist });
  } else {
    await prisma.artist.update({ data: artist, where: { id: parseInt(id) } });
  }

  redirect("/artists");
}

export async function deleteArtist(form: FormData) {
  const id = form.get("id") as string;

  const artist = await prisma.artist.findFirst({ where: { id: parseInt(id) } });
  if (artist) {
    const fileId = artist.profile_picture.split("/f/");
    await utapi.deleteFiles(fileId[1]);
    await prisma.artist.delete({ where: { id: parseInt(id) } });

    revalidatePath("/artists");
  }
}

export async function getAllArtists() {
  return await prisma.artist.findMany();
}
