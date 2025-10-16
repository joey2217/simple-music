import { Button } from "@/components/ui/button";
import MusicPage from "@/main/components/music-page";
import PageHeader from "@/main/components/page-header";
import { usePlayerStore } from "@/main/store/player";
import { Album } from "@/main/types";
import { Play, Plus } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router";
import useSWR from "swr";

export default function AlbumPage() {
  const { id } = useParams<"id">();
  const [searchParams] = useSearchParams();
  const queryPage = searchParams.get("page") ?? "1";
  const page = Number(queryPage);

  const { appendToPlayerList } = usePlayerStore();

  const { data: album, isLoading, error } = useSWR<Album>(`/api/www/album/albumInfo?albumId=${id}&pn=${page}&rn=20`);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (album) {
    return (
      <>
        <PageHeader title={"专辑 : " + album.album} />
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 flex flex-col gap-4">
              <h2 className="text-xl font-semibold">{album.album}</h2>
              <Link to={"/artist/" + album.artistid} className="link">
                {album.artist}
              </Link>
              <div className="flex gap-4">
                <div>
                  <span className="text-gray-400">语种 : </span>
                  {album.lang}
                </div>
                <div>
                  <span className="text-gray-400">发行时间 : </span>
                  {album.releaseDate}
                </div>
              </div>
              <div>
                <span className="text-gray-400">简直 : </span> {album.albuminfo}
              </div>
            </div>
            <div className="col-span-1">
              <img src={album.pic} alt="专辑封面" className="w-[120px] rounded" />
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => appendToPlayerList(album.musicList, true)}>
              <Play />
              <span>播放全部</span>
            </Button>
            <Button variant="secondary" onClick={() => appendToPlayerList(album.musicList)}>
              <Plus />
              <span>添加</span>
            </Button>
          </div>
          <MusicPage
            total={album.total}
            current={page}
            size={20}
            urlRender={(p) => `/album/${id}?page=${p}`}
            data={album.musicList}
          />
        </div>
      </>
    );
  }
  return <PageHeader title="未知专辑" />;
}
