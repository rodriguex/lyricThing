"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

export default function YoutubePlayer({
  playerRef,
  url,
  setVideoSeconds,
}: {
  playerRef: any;
  url: string;
  setVideoSeconds?: Dispatch<SetStateAction<number>>;
}) {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  function onProgress(played: OnProgressProps) {
    if (setVideoSeconds) {
      setVideoSeconds(played.playedSeconds);
    }
  }

  return (
    <>
      {hasWindow && (
        <ReactPlayer
          ref={playerRef}
          url={url}
          controls={true}
          style={{ position: "sticky", top: 100 }}
          onProgress={onProgress}
          width={550}
        />
      )}
    </>
  );
}
