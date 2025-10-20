import ArtistCard from "@/main/components/artist-card";
import { useLikeArtistStore } from "@/main/store/like";

export default function LikeArtist() {
  const list = useLikeArtistStore((s) => s.like);
  return (
    <div className="my-4 grid grid-cols-2 sm:col-span-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-1 md:gap-2 lg:gap-3">
      {list.map((a) => (
        <ArtistCard key={a.id} artist={a} />
      ))}
    </div>
  );
}
