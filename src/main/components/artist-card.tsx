import { Skeleton } from "@/components/ui/skeleton";
import { Artist } from "../types/artist";
import { Link } from "react-router";

interface Props {
  artist: Artist;
  className?: string;
}

export default function ArtistCard({ artist, className = "" }: Props) {
  return (
    <Link to={`/artist/${artist.id}`} className={`text-center ${className}`}>
      <div className="aspect-square">
        <img src={artist.pic300} alt={artist.name} className="rounded-full mx-auto" />
      </div>
      <div className="flex justify-center items-center gap-1">
        <h4 className="text-lg font-semibold">{artist.name}</h4>
        {/* {artistLikeIds.includes(artist.id) && (
          <FluentHeart className="text-red-400" />
        )} */}
      </div>
      <div className="text-sm text-gray-500">{artist.musicNum}首歌曲</div>
    </Link>
  );
}

export function ArtistCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <Skeleton className="aspect-square rounded-full" />
      <Skeleton className="h-7"></Skeleton>
      <Skeleton className="h-5"></Skeleton>
    </div>
  );
}
