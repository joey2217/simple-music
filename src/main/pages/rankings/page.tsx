import useSWR from "swr";
import { fetcher } from "../../lib/request";
import { useState } from "react";
import { useParams } from "react-router";
import { RankingListData } from "@/main/types/ranking";

export default function Rankings() {
  const { id = "17" } = useParams<"id">();
  const [page, setPage] = useState(1);

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
    return data.num;
  }
}
