"use client";

import { AllLyrics } from "../types";
import EachLyric from "./each-lyric";

export default function ShowLyrics({ lyrics }: { lyrics: AllLyrics[] }) {
  function formatDate(date: Date) {
    const userLanguage = window.navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return new Intl.DateTimeFormat(userLanguage, {
      timeZone: timezone,
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  }

  return (
    <div className="mt-14 flex flex-wrap gap-16">
      {lyrics.length ? (
        lyrics.map((lyric) => (
          <EachLyric
            key={lyric.id}
            lyric={{
              ...lyric,
              released_at: formatDate(lyric.released_at as Date),
              artist: {
                ...lyric.artist,
                profile_picture: `${process.env.NEXT_PUBLIC_BUCKET_URL}/${lyric?.artist?.profile_picture}`,
              },
            }}
          />
        ))
      ) : (
        <span>no lyrics registerd yet</span>
      )}
    </div>
  );
}
