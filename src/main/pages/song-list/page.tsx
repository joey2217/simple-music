import { SongListTag } from "@/main/types/song-list";
import { useSearchParams } from "react-router";
import useSWR from "swr";

export default function SongListPage() {
  const [searchParams] = useSearchParams();
  return (
    <div>
      <SongListPageTag tag={""} />
    </div>
  );
}

function SongListPageTag({ tag: queryTag }: { tag: string }) {
  const { data, isLoading, error } = useSWR<SongListTag[]>("/api/www/playlist/getTagList");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <div>
        {data
          .filter((tag) => tag.data.length > 0)
          .map((tag) => (
            <div key={tag.id} className="flex items-center flex-wrap gap-2 py-1">
              <div className="text-lg text-primary">{tag.name}</div>
              {tag.data.map((t) => (
                <div
                  key={t.id}
                  className={`px-3 py-0.5 text-center cursor-pointer rounded-full ${
                    queryTag === t.id ? "bg-primary hover:bg-primary/80" : "hover:bg-gray-500/50"
                  }`}
                >
                  {t.name}
                </div>
              ))}
            </div>
          ))}
      </div>
    );
  }
  return null;
}
