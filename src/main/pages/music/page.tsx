import PageHeader from "@/main/components/page-header";
import { Music } from "@/main/types";
import { PlayIcon, Plus } from "lucide-react";
import { Link, useParams } from "react-router";
import useSWR from "swr";

export default function MusicPage() {
  const { id } = useParams<"id">();
  if (id) {
    return (
      <>
        <MusicInfo id={id} />
        <MusicLyric id={id} />
      </>
    );
  }
  return null;
}

function MusicInfo({ id }: { id: string }) {
  const { data: musicInfo, isLoading, error } = useSWR<Music>(`/api/www/album/albumInfo?mid=${id}`);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (musicInfo) {
    return (
      <div>
        <PageHeader title={"歌曲 : " + musicInfo.name} />
        <div className="px-4 grid grid-cols-4">
          <div className="col-span-3 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{musicInfo.name}</h2>
            <Link to={"/artist/" + musicInfo.artistid} className="text-gray-400">
              {musicInfo.artist}
            </Link>
            <div>
              <span className="text-gray-400 label">专辑</span>
              <Link to={"/album/" + musicInfo.albumid}>{musicInfo.album}</Link>
            </div>
            <div>
              <span className="text-gray-400 label">发行时间</span>
              {musicInfo.releaseDate}
            </div>
            <div>
              <span className="text-gray-400 label">专辑简介</span>
              {musicInfo.albuminfo}
            </div>
            <div className="flex gap-4">
              <button className="primary-btn">
                <PlayIcon />
                <span>播放</span>
              </button>
              <button className="default-btn">
                <Plus />
                <span>添加</span>
              </button>
            </div>
          </div>
          <div className="col-span-1">
            <img src={musicInfo.pic120} alt="专辑封面" className="rounded aspect-square" />
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function MusicLyric({ id }: { id: string }) {
  return <div className="flex mt-4 flex-col gap-1 items-center">{id} TODO</div>;
}
