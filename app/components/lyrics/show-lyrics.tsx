"use client";

import { AllLyrics } from "@/app/types";
import EachLyric from "./each-lyric";

export default function ShowLyrics({ lyrics }: { lyrics: AllLyrics[] }) {
  return (
    <div className="mt-14 flex flex-wrap gap-16">
      {lyrics.length ? (
        lyrics.map((lyric) => (
          <EachLyric
            key={lyric.id}
            lyric={{
              ...lyric,
              artist: {
                ...lyric.artist,
                profile_picture: `${process.env.NEXT_PUBLIC_BUCKET_URL}/${lyric?.artist?.profile_picture}`,
              },
            }}
          />
        ))
      ) : (
        <span>No lyrics registered yet</span>
      )}
    </div>
  );
}
