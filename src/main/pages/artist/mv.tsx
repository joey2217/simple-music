import Pagination from "@/components/pagination";
import MvCard from "@/main/components/mv-card";
import { Mv } from "@/main/types";
import { useParams, useSearchParams } from "react-router";
import useSWR from "swr";

export default function ArtistMVPage() {
  const { id } = useParams<"id">();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");

  const { data, isLoading, error } = useSWR<{
    mvlist: Mv[];
    total: string;
  }>(`/api/www/artist/artistMv?artistid=${id}&pn=${page}&rn=20`);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <div>
        <div className="card-grid mb-4 mt-2">
          {data.mvlist.map((m) => (
            <MvCard key={m.id} mv={m} />
          ))}
        </div>
        <Pagination
          total={Number(data.total)}
          size={20}
          current={page}
          urlRender={(p) => `/artist/${id}/mv?page=${p}`}
        />
      </div>
    );
  }
  return null;
}
