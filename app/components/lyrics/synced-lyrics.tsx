"use client";

import { Lyric, TimedVerse } from "@/app/types";
import YoutubePlayer from "../youtube-player";
import { useState } from "react";

export default function SyncedLyrics({
  verses,
  song,
}: {
  verses: TimedVerse[];
  song: Lyric;
}) {
  const [videoDuration, setVideoDuration] = useState(0);

  return (
    <div className="flex justify-between">
      <div className="mt-10 text-lg whitespace-pre-line">
        {verses.length &&
          verses.map((verse) => (
            <div>
              {verse.id && verse.start && verse.end && (
                <span
                  className={`block ${
                    videoDuration >= parseInt(verse.start as string) &&
                    videoDuration <= parseInt(verse.end as string) &&
                    "font-bold"
                  }`}
                >
                  {verse.verse}
                </span>
              )}
            </div>
          ))}
      </div>

      <YoutubePlayer
        url={song.youtube_link}
        setVideoSeconds={setVideoDuration}
      />
    </div>
  );
}
