import { Button } from "@/components/ui/button";
import MusicPage from "@/main/components/music-page";
import { usePlayerStore } from "@/main/store/player";
import type { Music, PageData } from "@/main/types";
import { useParams, useSearchParams } from "react-router";
import useSWR from "swr";

export default function ArtistPage() {
  const { id } = useParams<"id">();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const appendToPlayerList = usePlayerStore((s) => s.appendToPlayerList);

  const { error, data, isLoading } = useSWR<PageData<Music>>(
    `/api/www/artist/artistMusic?artistid=${id}&pn=${page}&rn=20`,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <>
        <div className="flex gap-4 my-4">
          <Button onClick={() => appendToPlayerList(data.list, true)}>
            <span>播放全部</span>
          </Button>
          <Button variant="secondary" onClick={() => appendToPlayerList(data.list)}>
            <span>添加</span>
          </Button>
        </div>
        <MusicPage
          current={page}
          data={data.list}
          total={data.total}
          size={20}
          urlRender={(p) => `/artist/${id}?page=${p}`}
        />
      </>
    );
  }

  return null;
}
