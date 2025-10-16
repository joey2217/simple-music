import { Link } from "react-router";
import { Mv } from "../types";
import { PlayIcon } from "lucide-react";

interface Props {
  mv: Mv;
}

export default function MvCard({ mv }: Props) {
  return (
    <div className="rounded flex flex-col">
      <Link to={"/mv/detail/" + mv.id} className="block relative overflow-hidden w-full rounded aspect-video">
        <div className="relative z-20 cursor-pointer transition ease-in-out duration-300 hover:scale-105">
          <img src={mv.pic} alt={mv.name} className="w-full hover:scale-105" />
          <div className="absolute z-30 top-0 left-0 w-full h-full flex items-center hover:bg-gray-900/40 justify-center opacity-0 hover:opacity-95">
            <button className="text-4xl p-3 bg-gray-600/70 rounded-full" title="播放">
              <PlayIcon />
            </button>
          </div>
        </div>
        <div className="absolute z-30 left-0 bottom-0 w-full p-2 shadow flex items-center gap-1 text-white">
          <PlayIcon />
          <span>{mv.mvPlayCnt}</span>
          <span className="ml-auto">{mv.songTimeMinutes}</span>
        </div>
      </Link>
      <Link
        to={"/mv/detail/" + mv.id}
        className="block truncate mt-2 mb-1"
        dangerouslySetInnerHTML={{ __html: mv.name }}
      ></Link>
      <Link to={"/artist/" + mv.artistid} className="text-sm text-secondary">
        {mv.artist}
      </Link>
    </div>
  );
}
