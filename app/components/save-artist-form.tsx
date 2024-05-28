"use client";

import { useState } from "react";
import { Artist } from "../types";
import { createArtist } from "../actions/artists";
import UploadButton from "./upload-button";

export default function SaveArtistForm({
  updatingArtist,
}: {
  updatingArtist: Artist | null;
}) {
  const [artist, setArtist] = useState<Artist>({
    name: updatingArtist?.name ?? "",
    about: updatingArtist?.about ?? "",
  });

  const [artistPicture, setArtistPicture] = useState(
    updatingArtist?.profile_picture ?? ""
  );

  const [isLoading, setIsLoading] = useState(false);
  const isButtonBlocked = !artist.name || !artist.about || artistPicture === "";

  async function deletePhoto() {
    setIsLoading(true);
    const fileId = artistPicture.split("/f/");
    if (fileId) {
      await fetch("http://localhost:3000/api/artists/deletePhoto", {
        method: "POST",
        body: JSON.stringify({
          fileId: fileId[1],
          artistId: updatingArtist?.id,
        }),
      });
      setArtistPicture("");
      setIsLoading(false);
    }
  }

  return (
    <form className="mt-10 flex flex-col gap-8 w-[500px]" action={createArtist}>
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
            <img
              src={artistPicture}
              className="w-48 rounded-lg"
              alt="Current Profile Picture"
            />
            <span
              className="cursor-pointer text-sm text-red-700"
              onClick={deletePhoto}
            >
              {isLoading ? "Deleting..." : "Delete Photo"}
            </span>
          </div>
        )}

        {!artistPicture && (
          <div className="mb-4">
            <span>Add the best picture of this artist</span>
            <UploadButton setArtistPicture={setArtistPicture} />
          </div>
        )}
      </div>

      <input type="hidden" name="id" value={updatingArtist?.id} />
      <input type="hidden" name="url" value={artistPicture} />

      <button
        disabled={isButtonBlocked ? true : false}
        className={`border-2 p-3 rounded-lg font-bold text-lg ${
          isButtonBlocked
            ? "bg-gray-100 border-gray-300 hover:bg-gray-100 text-gray-500 cursor-not-allowed"
            : "bg-black text-white"
        }`}
      >
        Save new Artist!
      </button>
    </form>
  );
}
