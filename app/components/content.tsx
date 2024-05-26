import { ReactNode } from "react";

export default function Content({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white shadow py-10 px-36 rounded-xl w-fit max-w-[1700px] mx-auto my-10 border-2">
      {children}
    </div>
  );
}
