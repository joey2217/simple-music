import useSWR from "swr";
import { fetcher } from "../../lib/request";
import { useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { RankingListData, RankingMenuItem } from "@/main/types/ranking";
import { usePlayerStore } from "@/main/store/player";
import MusicList from "@/main/components/music-list";

export default function Rankings() {
  const { id = "17" } = useParams<"id">();
  const [page, setPage] = useState(1);
  const { play } = usePlayerStore();
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
      <div className="grow h-full overflow-auto">
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
          <button className="primary-btn">
            <span>播放全部</span>
          </button>
          <button className="default-btn">
            <span>添加</span>
          </button>
        </div>
        <MusicList items={data.musicList} />
      </div>
    );
  }
}
