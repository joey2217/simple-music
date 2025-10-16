import Pagination from "@/components/pagination";
import AlbumCard from "@/main/components/album-card";
import { Album } from "@/main/types";
import { useParams, useSearchParams } from "react-router";
import useSWR from "swr";

export default function ArtistAlbumPage() {
  const { id } = useParams<"id">();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");

  const { isLoading, error, data } = useSWR<{
    albumList: Album[];
    total: string;
  }>(`/api/www/artist/artistAlbum?artistid=${id}&pn=${page}&rn=20`);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <div>
        <div className="card-grid">
          {data.albumList.map((a) => (
            <AlbumCard key={a.albumid} album={a} />
          ))}
        </div>
        <Pagination
          current={page}
          total={Number(data.total)}
          size={20}
          urlRender={(p) => `/artist/${id}/album?page=${p}`}
        />
      </div>
    );
  }

  return null;
}
