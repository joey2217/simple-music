import Pagination from "@/components/pagination";
import { buttonVariants } from "@/components/ui/button";
import ArtistCard from "@/main/components/artist-card";
import { Artist } from "@/main/types/artist";
import { type SetURLSearchParams, useSearchParams } from "react-router";
import useSWR from "swr";

export default function ArtistsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const prefix = searchParams.get("prefix") ?? "";
  const category = searchParams.get("category") ?? "0";
  const page = Number(searchParams.get("page") ?? "1");

  const { data, isLoading, error } = useSWR<{ artistList: Artist[]; total: string }>(
    `/api/www/artist/artistList?prefix=${prefix}&category=${category}&pn=${page}&rn=20`,
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
        <ArtistTags prefix={prefix} category={category} setSearchParams={setSearchParams} />
        <div className="my-4 grid grid-cols-4 sm:col-span-4 md:grid-cols-6 lg:col-span-8 xl:col-span-10 gap-2 md:gap-4">
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

function ArtistTags({
  prefix,
  category,
  setSearchParams,
}: {
  prefix: string;
  category: string;
  setSearchParams: SetURLSearchParams;
}) {
  return (
    <>
      <ul className="flex flex-wrap gap-1">
        {LETTER_TAGS.map((tag) => (
          <li
            key={tag.value}
            className={buttonVariants({
              variant: tag.value === prefix ? "default" : "secondary",
            })}
            onClick={() =>
              setSearchParams({
                prefix: tag.value,
                page: "1",
              })
            }
          >
            {tag.label}
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap gap-1">
        {KIND_TAGS.map((tag) => (
          <li
            key={tag.value}
            className={buttonVariants({
              variant: tag.value === category ? "default" : "secondary",
            })}
            onClick={() =>
              setSearchParams({
                category: tag.value,
                page: "1",
              })
            }
          >
            {tag.label}
          </li>
        ))}
      </ul>
    </>
  );
}
