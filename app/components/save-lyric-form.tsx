"use client";

import { useState } from "react";
import { Artist, Lyric } from "../types";
import { createLyric } from "../actions/lyrics";

export default function SaveLyricForm({
  updatingLyric,
  artists,
}: {
  updatingLyric: Lyric | null;
  artists: Artist[] | null;
}) {
  const [lyric, setLyric] = useState<Lyric>({
    song_name: updatingLyric?.song_name ?? "",
    released_at: updatingLyric?.released_at ?? "",
    lyrics: updatingLyric?.lyrics ?? "",
    youtube_link: updatingLyric?.youtube_link ?? "",
  });

  const [selectedArtist, setSelectedArtist] = useState(
    updatingLyric?.artist_id ?? ""
  );

  const isButtonBlocked =
    !lyric.song_name ||
    !lyric.released_at ||
    !lyric.lyrics ||
    !lyric.youtube_link;

  return (
    <form className="mt-10 flex flex-col gap-8 w-[500px]" action={createLyric}>
      <div className="flex flex-col">
        <label htmlFor="songName">Song name</label>
        <input
          required
          id="songName"
          name="songName"
          className="border shadow p-3 rounded"
          placeholder="Nômade"
          value={lyric.song_name}
          onChange={(e) => setLyric({ ...lyric, song_name: e.target.value })}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="releasedAt">Released At</label>
        <input
          required
          type="date"
          id="releasedAt"
          name="releasedAt"
          className="border shadow p-3 rounded"
          value={lyric.released_at as string}
          onChange={(e) => setLyric({ ...lyric, released_at: e.target.value })}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="youtubeLink">Youtube Link</label>
        <input
          required
          id="youtubeLink"
          name="youtubeLink"
          className="border shadow p-3 rounded"
          placeholder="https://www.youtube.com/watch?v=SE-YCWfBXpY&ab_channel=Japa"
          value={lyric.youtube_link}
          onChange={(e) => setLyric({ ...lyric, youtube_link: e.target.value })}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="artist">Which Artist</label>
        <select
          name="artist"
          className="border shadow p-3 rounded bg-white"
          value={lyric?.artist_id ?? selectedArtist}
          onChange={(e) => setSelectedArtist(e.target.value)}
        >
          <option value="">Select a value</option>
          {artists &&
            artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="lyrics">Lyrics of the Song</label>
        <textarea
          required
          id="lyrics"
          name="lyrics"
          className="border shadow p-3 rounded"
          placeholder="De manhã, até tarde, até tarde..."
          rows={20}
          value={lyric.lyrics}
          onChange={(e) => setLyric({ ...lyric, lyrics: e.target.value })}
        />
      </div>

      <input type="hidden" name="id" value={updatingLyric?.id} />

      <button
        disabled={isButtonBlocked ? true : false}
        className={`border-2 p-3 rounded-lg font-bold text-lg ${
          isButtonBlocked
            ? "bg-gray-100 border-gray-300 hover:bg-gray-100 text-gray-500 cursor-not-allowed"
            : "bg-black text-white"
        }`}
      >
        Save new lyric!
      </button>
    </form>
  );
}
