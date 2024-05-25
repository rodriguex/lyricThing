"use client";

import { FormEvent, useState } from "react";
import Content from "@/app/components/content";
import { UploadButton } from "@/app/utils/uploadthing";

interface Artist {
  name: string;
  profile_picture: File | string;
  about: string;
  created_at?: string;
}

export default function Page() {
  const [artist, setArtist] = useState<Artist>({
    name: "",
    profile_picture: "",
    about: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setArtist({ name: "", about: "", profile_picture: "" });

    await fetch("/api/artists/new", {
      method: "post",
      body: JSON.stringify(artist),
    });
  }

  return (
    <Content>
      <div className="flex flex-col">
        <h1 className="font-bold text-6xl">Artists</h1>
        <span>Register a new artist and start rocking with popular hits!</span>
        <form
          className="mt-10 flex flex-col gap-8 w-[500px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="name">Name of the Artist</label>
            <input
              required
              id="name"
              type="text"
              className="border shadow p-3 rounded"
              placeholder="Lil Zé"
              value={artist.name}
              onChange={(e) => setArtist({ ...artist, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="about">About the Artist</label>
            <textarea
              required
              id="about"
              className="border shadow p-3 rounded"
              placeholder="A new artist to the scene who will change what we think about trap."
              value={artist.about}
              onChange={(e) => setArtist({ ...artist, about: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="file">Profile picture of the Artist</label>
            <UploadButton
              className="mt-2 flex items-start ut-button:bg-black"
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                setArtist({
                  ...artist,
                  profile_picture: res[0].serverData.file_url,
                });
              }}
              onUploadError={(error: Error) => {
                console.log(error);
              }}
            />
          </div>
          <button
            disabled={
              !artist.name && !artist.about && !artist.profile_picture
                ? true
                : false
            }
            className={`mt-4 border-2 p-3 rounded-lg font-bold text-lg ${
              !artist.name || !artist.about || !artist.profile_picture
                ? "bg-gray-100 border-gray-300 hover:bg-gray-100 text-gray-500 hover:text-black cursor-not-allowed"
                : "bg-black text-white"
            }`}
          >
            Save new Artist!
          </button>
        </form>
      </div>
    </Content>
  );
}
