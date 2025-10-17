import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import SongListItemCard from "@/main/components/song-list-item";
import { SongListItem, SongListTag } from "@/main/types/song-list";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router";
import useSWR from "swr";

type OrderId = "new" | "hot";
const HOT_TAGS: { label: string; value: OrderId }[] = [
  {
    label: "最新",
    value: "new",
  },
  {
    label: "最热",
    value: "hot",
  },
];

export default function SongListPage() {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag") ?? "new";
  const type = (searchParams.get("type") as "order" | "id") ?? "order"; // order or id
  const page = Number(searchParams.get("page") ?? "1");

  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="flex items-center flex-wrap gap-2 py-1">
        <div className="text-lg primary">精选</div>
        {HOT_TAGS.map((t) => (
          <Link
            to={`/song-list?tag=${t.value}&type=order`}
            key={t.value}
            className={`px-3 py-0.5 text-center cursor-pointer rounded-full ${
              tag === t.value ? "bg-primary hover:primary/80" : "hover:bg-gray-500/50"
            }`}
          >
            {t.label}
          </Link>
        ))}
        <Button onClick={() => setShow((s) => !s)} size="sm" variant="ghost">
          <span>更多</span>
          <ChevronDown className={`${show ? "rotate-180" : ""}`} />
        </Button>
      </div>
      <div className={`${show ? "block" : "hidden"}`}>
        <SongListPageTag tag={tag} />
      </div>
      <SongListPageData tag={tag} type={type} page={page} />
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
                <NavLink
                  key={t.id}
                  className={`px-3 py-0.5 text-center cursor-pointer rounded-full ${
                    queryTag === t.id ? "bg-primary hover:bg-primary/80" : "hover:bg-gray-500/50"
                  }`}
                  to={`/song-list?tag=${t.id}&type=id`}
                >
                  {t.name}
                </NavLink>
              ))}
            </div>
          ))}
      </div>
    );
  }
  return null;
}

function SongListPageData({ type, tag, page }: { type: "order" | "id"; tag: string; page: number }) {
  const url =
    type === "order"
      ? `/api/www/classify/playlist/getRcmPlayList?order=${tag}&pn=1&rn=20`
      : `/api/www/classify/playlist/getTagPlayList?id=${tag}&pn=${page}&rn=20}`;
  const { data, isLoading, error } = useSWR<{
    data: SongListItem[];
    total: number;
  }>(url);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <>
        <div className="my-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.data.map((item) => (
            <SongListItemCard key={item.id} item={item} />
          ))}
        </div>
        <Pagination
          total={data.total}
          size={20}
          current={page}
          urlRender={(p) => `/song-list?tag=${tag}&type=${type}&page=${p}`}
        />
      </>
    );
  }

  return null;
}
