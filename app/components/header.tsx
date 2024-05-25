import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <div className="shadow bg-white w-full h-[70px] flex items-center">
      <div className="w-full max-w-5xl mx-auto flex justify-center items-center text-lg gap-14">
        <Link href="/" className="cursor-pointer hover:underline">
          Home
        </Link>
        <Link href="/artists" className="cursor-pointer hover:underline">
          Artists
        </Link>
        <Link href="/lyrics" className="cursor-pointer hover:underline">
          Lyrics
        </Link>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
