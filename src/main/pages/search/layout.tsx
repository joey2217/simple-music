import { Link, NavLink, Outlet, useSearchParams } from "react-router";
import useSWR from "swr";
import SearchInput from "@/main/components/search-input";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";

export default function SearchLayout() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  return (
    <div>
      <SearchInput className="w-1/3 mx-auto my-4" />
      <HotSearchKey />
      <SearchHistory keyword={keyword} />
      <div className="my-4 flex gap-8 items-baseline">
        <div className="text-2xl font-semibold">搜索结果</div>
        {keyword ? (
          <nav className="flex my-4 gap-2">
            <NavLink
              className="link"
              to={{
                pathname: "",
                search: `keyword=${keyword}`,
              }}
              end
            >
              单曲
            </NavLink>
            <NavLink
              className="link"
              to={{
                pathname: "artist",
                search: `keyword=${keyword}`,
              }}
            >
              歌手
            </NavLink>
            <NavLink
              className="link"
              to={{
                pathname: "playlist",
                search: `keyword=${keyword}`,
              }}
            >
              歌单
            </NavLink>
            <NavLink
              className="link"
              to={{
                pathname: "album",
                search: `keyword=${keyword}`,
              }}
            >
              专辑
            </NavLink>
            <NavLink
              className="link"
              to={{
                pathname: "mv",
                search: `keyword=${keyword}`,
              }}
            >
              MV
            </NavLink>
          </nav>
        ) : (
          <div>暂无数据</div>
        )}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

function HotSearchKey() {
  const { data, isLoading, error } = useSWR<string[]>("/api/www/search/searchKey");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <div className="my-1">
        <div>热门搜索:</div>
        <div className="flex flex-wrap gap-1">
          {data.map((key) => (
            <Link
              key={key}
              to={{
                pathname: "",
                search: `keyword=${key}`,
              }}
              className="link"
            >
              {key}
            </Link>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

function SearchHistory({ keyword }: { keyword: string }) {
  const [value, setValue, removeValue] = useLocalStorage<string[]>("search-history", []);

  useEffect(() => {
    if (keyword) {
      setValue((d) => [keyword, ...d.filter((item) => item !== keyword)].slice(0, 20));
    }
  }, [keyword, setValue]);

  return (
    <div className="my-1">
      <div>
        搜索历史:
        <button onClick={() => removeValue()}>清空</button>
      </div>
      <div className="flex flex-wrap gap-1">
        {value.map((key) => (
          <Link
            key={key}
            to={{
              pathname: "",
              search: `keyword=${key}`,
            }}
            className="link"
          >
            {key}
          </Link>
        ))}
      </div>
    </div>
  );
}
