import { ReactNode } from "react";

export default function Content({
  children,
  classes,
}: {
  children: ReactNode;
  classes?: string;
}) {
  return (
    <div
      className={`bg-white shadow rounded-xl mx-auto my-10 border-2 ${classes}`}
    >
      {children}
    </div>
  );
}
