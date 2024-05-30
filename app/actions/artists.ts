"use server";

import { redirect } from "next/navigation";
import prisma from "../utils/prisma";
import { revalidatePath } from "next/cache";
import { Artist } from "../types";
import sharp from "sharp";
import {
  DeleteObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { File } from "buffer";

const client = new S3Client({ region: "us-east-2" });

export async function createArtist(formData: FormData) {
  const artistId = formData.get("id") as string;
  const name = formData.get("name") as string;
  const about = formData.get("about") as string;
  const file = formData.get("url") as string;
  const currentProfilePicture = formData.get(
    "current_profile_picture"
  ) as string;

  let getUser: Artist | null = null;
  if (artistId) {
    getUser = await prisma.artist.findFirst({
      where: { id: parseInt(artistId) },
    });
  }

  let fileName = currentProfilePicture ?? "";
  if (file) {
    fileName = await uploadFile(file as unknown as File);
  }

  if (fileName) {
    const newArtist = {
      name,
      about,
      profile_picture: fileName,
    };

    if (!getUser) {
      await prisma.artist.create({ data: newArtist });
    } else {
      await prisma.artist.update({
        data: newArtist,
        where: { id: parseInt(artistId) },
      });
    }

    redirect("/artists");
  }
}

async function uploadFile(file: File) {
  const imgToArrayBuffer = await file.arrayBuffer();
  const imgBuffer = Buffer.from(imgToArrayBuffer);

  const newFile = await sharp(imgBuffer)
    .resize({
      width: 600,
      fit: "cover",
    })
    .webp({ lossless: true })
    .toBuffer();

  const fileName = `${file.name} - ${new Date().getTime()}`;
  const input: any = {
    ACL: "public-read",
    Bucket: "lyricthingprofilepicture",
    Key: fileName,
    Body: newFile,
    ContentType: "image/jpeg",
  };

  const response = await client.send(new PutObjectCommand(input));
  if (response.$metadata.httpStatusCode === 200) {
    return fileName;
  }

  return "";
}

export async function deleteArtist(form: FormData) {
  const id = form.get("id") as string;

  const artist = await prisma.artist.findFirst({ where: { id: parseInt(id) } });
  if (artist) {
    const input = {
      Bucket: "lyricthingprofilepicture",
      Delete: {
        Objects: [{ Key: artist.profile_picture }],
      },
    };

    await client.send(new DeleteObjectsCommand(input));
    await prisma.artist.delete({ where: { id: parseInt(id) } });

    revalidatePath("/artists");
  }
}

export async function getAllArtists() {
  return await prisma.artist.findMany();
}

export async function deleteArtistPhoto(artist: Artist) {
  const input = {
    Bucket: "lyricthingprofilepicture",
    Delete: {
      Objects: [{ Key: artist.profile_picture }],
    },
  };

  await client.send(new DeleteObjectsCommand(input));
  await prisma.artist.update({
    data: { profile_picture: "" },
    where: { id: artist.id },
  });
}
