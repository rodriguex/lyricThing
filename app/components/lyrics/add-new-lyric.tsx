"use client";

import { updateLyrics } from "@/app/actions/lyrics";
import { Lyric, TimedVerse } from "@/app/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function AddNewLyric({
  song,
  verses,
  savedVerses,
  setSteps,
  setAddedVerses,
}: {
  song: Lyric;
  verses: TimedVerse[];
  savedVerses: TimedVerse[];
  setSteps: Dispatch<SetStateAction<number>>;
  setAddedVerses: Dispatch<SetStateAction<TimedVerse[]>>;
}) {
  const [wholeSong, setWholeSong] = useState(song?.lyrics ?? "");

  useEffect(() => {
    async function runFunction() {
      if (song?.lyrics && !verses.length) {
        await handleNewLyric();
      }
    }

    runFunction();
  }, []);

  async function handleNewLyric() {
    const splitted = wholeSong.split(/\r?\n|\r|\n/g);

    let array: TimedVerse[] = [];
    splitted.map((verse: string) => {
      array.push({
        id: undefined,
        lyric_id: 0,
        verse,
        start: 0,
        end: 0,
      });
    });

    if (savedVerses.length) {
      const newAddedVerses: TimedVerse[] = [...array];

      savedVerses.map((verse) => {
        const index = array.findIndex((added) => added.verse === verse.verse);
        if (index !== -1) {
          newAddedVerses[index] = verse;
        }
      });
      setAddedVerses(newAddedVerses);
    } else {
      setAddedVerses(array);
    }

    if (song?.id) {
      await updateLyrics(song?.id, wholeSong);
    }

    setSteps(2);
  }

  return (
    <div className="mt-10 flex flex-col gap-5">
      <span className="text-lg">
        Please write or copy the song lyrics here. Each line is a new verse
      </span>
      <textarea
        rows={30}
        className="border w-full max-w-[800px] border-black p-5 rounded-lg"
        placeholder="De manhã, até tarde, até tarde..."
        value={wholeSong}
        onChange={(e) => setWholeSong(e.target.value)}
      />
      <button
        className="w-[200px] border-2 border-black p-2 rounded font-bold"
        onClick={handleNewLyric}
      >
        Add Song
      </button>
    </div>
  );
}
