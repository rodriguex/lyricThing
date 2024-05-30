"use client";

import { Lyric, TimedVerse } from "@/app/types";
import { useState } from "react";
import SyncedLyrics from "./synced-lyrics";
import Tab from "../adding-verses/tab";
import AddNewLyric from "./add-new-lyric";
import EditingVerses from "./editing-verses";

export default function AddingVerses({
  song,
  verses,
}: {
  song: Lyric;
  verses: TimedVerse[];
}) {
  const [steps, setSteps] = useState(1);
  const [addedVerses, setAddedVerses] = useState<TimedVerse[]>([]);

  return (
    <div className="mt-20 ml-6 flex flex-col">
      <Tab steps={steps} handleSteps={setSteps} />

      {steps === 1 && (
        <AddNewLyric
          song={song}
          verses={addedVerses}
          savedVerses={verses}
          setSteps={setSteps}
          setAddedVerses={setAddedVerses}
        />
      )}

      {steps === 2 && (
        <EditingVerses
          song={song}
          verses={addedVerses}
          setAddedVerses={setAddedVerses}
        />
      )}

      {steps === 3 && <SyncedLyrics verses={addedVerses} song={song} />}
    </div>
  );
}
