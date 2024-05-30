import { Dispatch, SetStateAction } from "react";

export default function Tab({
  steps,
  handleSteps,
}: {
  steps: number;
  handleSteps: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex items-center gap-5">
      <span
        className={`cursor-pointer ${steps === 1 && "underline"}`}
        onClick={() => handleSteps(1)}
      >
        Add Lyric
      </span>
      <span
        className={`cursor-pointer ${steps === 2 && "underline"}`}
        onClick={() => handleSteps(2)}
      >
        Edit each verse
      </span>
      <span
        className={`cursor-pointer ${steps === 3 && "underline"}`}
        onClick={() => handleSteps(3)}
      >
        Preview
      </span>
    </div>
  );
}
