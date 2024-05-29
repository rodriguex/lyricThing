import { Artist } from "@/app/types";
import EachArtist from "./each-artist";

export default function ShowArtists({ artists }: { artists: Artist[] }) {
  return (
    <div className="mt-14 flex flex-wrap gap-12">
      {artists.length ? (
        artists.map((artist) => <EachArtist key={artist.id} artist={artist} />)
      ) : (
        <span>No artists registered yet</span>
      )}
    </div>
  );
}
