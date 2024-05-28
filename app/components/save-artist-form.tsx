"use client";

import { useState } from "react";
import { Artist } from "../types";
import { createArtist, deleteArtistPhoto } from "../actions/artists";

export default function SaveArtistForm({
  updatingArtist,
}: {
  updatingArtist: Artist | null;
}) {
  const [artist, setArtist] = useState<Artist>({
    name: updatingArtist?.name ?? "",
    about: updatingArtist?.about ?? "",
  });

  const [artistPicture, setArtistPicture] = useState<any>(
    updatingArtist?.profile_picture ?? ""
  );

  const [isLoadingDeletion, setIsLoadingDeletion] = useState(false);
  const [isLoadingSaving, setIsLoadingSaving] = useState(false);

  async function deletePhoto() {
    setIsLoadingDeletion(true);
    await deleteArtistPhoto({
      ...artist,
      id: updatingArtist?.id,
      profile_picture: artistPicture,
    });
    setArtistPicture("");
    setIsLoadingDeletion(false);
  }

  return (
    <form
      className="mt-10 flex flex-col gap-8 w-[500px]"
      action={(formData: any) => {
        setIsLoadingSaving(true);
        createArtist(formData);
        setIsLoadingSaving(false);
      }}
    >
      <div className="flex flex-col">
        <label htmlFor="name">Name of the Artist</label>
        <input
          required
          id="name"
          name="name"
          className="border shadow p-3 rounded"
          placeholder="Lil Zé"
          value={artist.name}
          onChange={(e) => setArtist({ ...artist, name: e.target.value })}
        />
      </div>

      {isLoadingSaving}

      <div className="flex flex-col">
        <label htmlFor="about">About the Artist</label>
        <textarea
          required
          id="about"
          name="about"
          className="border shadow p-3 rounded"
          placeholder="A new artist to the scene who will change what we think about trap."
          value={artist.about}
          onChange={(e) => setArtist({ ...artist, about: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1">
        {artistPicture && (
          <div className="flex flex-col gap-1 mb-10">
            <span>Current profile picture</span>
            <div
              style={{
                backgroundImage: `url('${process.env.NEXT_PUBLIC_BUCKET_URL}/${artistPicture}')`,
              }}
              className="bg-cover bg-center rounded-full w-[150px] h-[150px]"
            />
            <span
              className="cursor-pointer text-sm mt-2 text-red-700"
              onClick={deletePhoto}
            >
              {isLoadingDeletion ? "Deleting..." : "Delete Photo"}
            </span>
          </div>
        )}

        {!artistPicture && (
          <div className="mb-4">
            <span>Add the best picture of this artist</span>
            <input required type="file" name="url" />
          </div>
        )}
      </div>

      <input type="hidden" name="id" value={updatingArtist?.id} />
      <input
        type="hidden"
        name="current_profile_picture"
        value={artistPicture}
      />

      <button className="border-2 p-3 rounded-lg font-bold text-lg bg-black text-white">
        {isLoadingSaving ? "Saving..." : "Save new Artist"}
      </button>
    </form>
  );
}
