export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white shadow py-10 px-36 rounded-xl w-fit mx-auto mt-10">
      {children}
    </div>
  );
}
