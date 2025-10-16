import useSWR from "swr";
import { fetcher } from "../../lib/request";
import { useOutletContext, useParams, useSearchParams } from "react-router";
import { RankingListData, RankingMenuItem } from "@/main/types/ranking";
import { usePlayerStore } from "@/main/store/player";
import MusicPage from "@/main/components/music-page";
import { Button } from "@/components/ui/button";

export default function Rankings() {
  const { id = "17" } = useParams<"id">();
  const [searchParams] = useSearchParams();
  const queryPage = searchParams.get("page") ?? "1";
  const page = Number(queryPage);

  const { appendToPlayerList } = usePlayerStore();
  const currentRanking = useOutletContext<RankingMenuItem | undefined>();

  const { data, isLoading, error } = useSWR<RankingListData>(
    `/api/www/bang/bang/musicList?bangId=${id}&pn=${page}&rn=20`,
    fetcher,
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
        <div className="flex gap-4 py-1 flex-wrap">
          <div>
            <h2 className="text-2xl font-semibold">
              {currentRanking ? currentRanking.name.replace("酷我", "") : "飙升榜"}
            </h2>
            <div className="leading-10">
              <span className="label">更新时间</span>
              <span>{data.pub}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 my-4">
          <Button onClick={() => appendToPlayerList(data.musicList, true)}>
            <span>播放全部</span>
          </Button>
          <Button variant="secondary" onClick={() => appendToPlayerList(data.musicList)}>
            <span>添加</span>
          </Button>
        </div>
        <MusicPage
          total={Number(data.num)}
          current={page}
          size={20}
          urlRender={(p) => `/rankings/${id}?page=${p}`}
          data={data.musicList}
        />
      </>
    );
  }
}
