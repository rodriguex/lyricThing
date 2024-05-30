"use client";

import { saveVerse, updateVerse } from "@/app/actions/verse";
import { Lyric, TimedVerse } from "@/app/types";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import YoutubePlayer from "../youtube-player";
import { log } from "console";
import ReactPlayer from "react-player";

export default function EditingVerses({
  song,
  verses,
  setAddedVerses,
}: {
  song: Lyric;
  verses: TimedVerse[];
  setAddedVerses: Dispatch<SetStateAction<TimedVerse[]>>;
}) {
  const [currentVerse, setCurrentVerse] = useState(0);

  const [startInput, setStartInput] = useState("0");
  const [endInput, setEndInput] = useState("0");

  const [isEditingVerse, setIsEditingVerse] = useState(false);
  const [videoSeconds, setVideoSeconds] = useState(0);

  const startInputRef = useRef<any>(null);
  const ytRef = useRef<any>(null);

  function setNewCurrentIndex(verse: TimedVerse) {
    const index = verses.findIndex(
      (added: TimedVerse) => added.verse === verse.verse
    );

    ytRef?.current.seekTo(verses[index].start, "seconds", true);

    setCurrentVerse(index);
    setStartInput(verse.start as string);
    setEndInput(verse.end as string);
    setIsEditingVerse(true);
  }

  async function handleNewVerse() {
    let verseId = null;

    if (isEditingVerse) {
      verseId = verses[currentVerse].id;

      const array: TimedVerse[] = [...verses];
      array[currentVerse] = {
        ...array[currentVerse],
        lyric_id: song.id as number,
        verse: verses[currentVerse].verse,
        start: startInput,
        end: endInput,
      };

      setAddedVerses(array);

      if (currentVerse + 1 === verses.length) {
        setIsEditingVerse(false);
      }
    }

    if (currentVerse + 1 < verses.length) {
      setCurrentVerse(currentVerse + 1);
    }
    setStartInput(endInput);
    setEndInput("");
    startInputRef.current.focus();

    const data = {
      lyric_id: song.id as number,
      verse: verses[currentVerse].verse,
      start: parseFloat(startInput),
      end: parseFloat(endInput),
    };

    if (isEditingVerse && verseId) {
      await updateVerse(verseId, data);
    } else {
      const responseVerse = await saveVerse(data);
      const versesCopy: TimedVerse[] = [...verses];

      versesCopy[currentVerse] = responseVerse;
      setAddedVerses(versesCopy);
    }
  }

  return (
    <div className="flex justify-between mt-5">
      <div className="w-[350px] flex flex-col gap-2 max-h-[500px] overflow-auto">
        {verses.map(
          (verse, verseIndex: number) =>
            verse.id &&
            verse.start &&
            verse.end && (
              <div key={verseIndex}>
                <div
                  key={verseIndex}
                  className="flex flex-col border p-2 rounded cursor-pointer hover:bg-gray-200"
                  onClick={() => setNewCurrentIndex(verse)}
                >
                  <span
                    className={`block ${
                      videoSeconds >= parseFloat(verse.start as string) &&
                      videoSeconds <= parseFloat(verse.end as string)
                        ? "font-bold"
                        : "font-normal"
                    }`}
                  >
                    {verse.verse}
                  </span>
                  <span>{verse.start}</span>
                  <span>{verse.end}</span>
                </div>
              </div>
            )
        )}
      </div>

      <div className="w-full max-w-[480px]">
        <span className="block text-lg">{verses[currentVerse].verse}</span>

        <div className="mt-5 flex flex-col">
          <label htmlFor="start">Start of the verse (0.00)</label>
          <input
            id="start"
            className="border p-2"
            ref={startInputRef}
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <label htmlFor="end">End of the verse (0.05)</label>
          <input
            id="end"
            className="border p-2"
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
          />
        </div>
        <button
          className="mt-5 border border-black font-bold p-2"
          onClick={handleNewVerse}
        >
          Next verse
        </button>
      </div>

      <YoutubePlayer
        playerRef={ytRef}
        url={song.youtube_link}
        setVideoSeconds={setVideoSeconds}
      />
    </div>
  );
}
