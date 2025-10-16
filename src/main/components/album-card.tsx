import { Link } from "react-router";
import type { Album } from "../types";
import { PlayIcon } from "lucide-react";

interface Props {
  album: Album;
}

export default function AlbumCard({ album }: Props) {
  return (
    <div>
      <Link to={"/album/" + album.albumid} className="block rounded overflow-hidden">
        <div className="relative rounded text-center cursor-pointer transition ease-in-out duration-300 hover:scale-105 ">
          <img src={album.pic} alt={album.album} className="rounded aspect-square mx-auto" />
          <div className="absolute z-20 top-0 left-0 w-full h-full flex items-center hover:bg-gray-900/40 justify-center opacity-0 hover:opacity-95">
            <button className="text-4xl p-3 bg-gray-600/70 rounded-full" title="播放">
              <PlayIcon />
            </button>
          </div>
        </div>
      </Link>
      <Link
        to={"/album/" + album.albumid}
        dangerouslySetInnerHTML={{ __html: album.album }}
        className="block truncate mt-2 mb-1"
      ></Link>
      <div className="text-secondary text-sm">{album.releaseDate}</div>
    </div>
  );
}
