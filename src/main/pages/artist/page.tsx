import MusicPage from "@/main/components/music-page";
import type { Music, PageData } from "@/main/types";
import { useParams, useSearchParams } from "react-router";
import useSWR from "swr";

export default function ArtistPage() {
  const { id } = useParams<"id">();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");

  const { error, data, isLoading } = useSWR<PageData<Music>>(`/api/www/artist/artistMusic?artistid=${id}&pn=${page}`);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <MusicPage current={page} data={data.list} total={data.total} urlRender={(p) => `/artist/${id}?page=${p}`} />
    );
  }

  return null;
}
