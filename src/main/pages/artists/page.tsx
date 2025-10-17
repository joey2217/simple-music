import Pagination from "@/components/pagination";
import { buttonVariants } from "@/components/ui/button";
import ArtistCard from "@/main/components/artist-card";
import { Artist } from "@/main/types/artist";
import { Link, useSearchParams } from "react-router";
import useSWR from "swr";

export default function ArtistsPage() {
  const [searchParams] = useSearchParams();
  const prefix = searchParams.get("prefix") ?? "";
  const category = searchParams.get("category") ?? "0";
  const page = Number(searchParams.get("page") ?? "1");

  return (
    <>
      <ArtistTags prefix={prefix} category={category} />
      <ArtistsList prefix={prefix} category={category} page={page} />
    </>
  );
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// prefix
const LETTER_TAGS = [
  {
    label: "热门",
    value: "",
  },
]
  .concat(LETTERS.split("").map((s) => ({ label: s, value: s })))
  .concat({
    label: "#",
    value: "%23",
  });

// category
const KIND_TAGS = [
  "全部",
  "华语男",
  "华语女",
  "华语组合",
  "日韩男",
  "日韩女",
  "日韩组合",
  "欧美男",
  "欧美女",
  "欧美组合",
  "其他",
].map((s, index) => ({ label: s, value: index.toString() }));

function ArtistTags({ prefix, category }: { prefix: string; category: string }) {
  return (
    <>
      <div className="flex flex-wrap gap-1">
        {LETTER_TAGS.map((tag) => (
          <Link
            to={`/artists?prefix=${tag.value}&category=${category}`}
            key={tag.value}
            className={buttonVariants({
              variant: tag.value === prefix ? "default" : "ghost",
              size: "sm",
              className: "cursor-pointer",
            })}
          >
            {tag.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-1 my-2">
        {KIND_TAGS.map((tag) => (
          <Link
            to={`/artists?prefix=${prefix}&category=${tag.value}`}
            key={tag.value}
            className={buttonVariants({
              variant: tag.value === category ? "default" : "ghost",
              size: "sm",
              className: "cursor-pointer",
            })}
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </>
  );
}

function ArtistsList({ prefix, category, page }: { prefix: string; category: string; page: number }) {
  const { data, isLoading, error } = useSWR<{ artistList: Artist[]; total: string }>(
    `/api/www/artist/artistInfo?prefix=${prefix}&category=${category}&pn=${page}&rn=60`,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    const total = Number(data.total);
    return (
      <>
        <div className="my-4 grid grid-cols-2 sm:col-span-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-1 md:gap-2 lg:gap-3">
          {data.artistList.map((a) => (
            <ArtistCard key={a.id} artist={a} />
          ))}
        </div>
        <Pagination
          total={total}
          current={page}
          size={60}
          urlRender={(p) => `/artists?prefix=${prefix}&category=${category}&page=${p}`}
        />
      </>
    );
  }

  return null;
}
