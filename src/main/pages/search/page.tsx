import Pagination from "@/components/pagination";
import AlbumCard from "@/main/components/album-card";
import ArtistCard from "@/main/components/artist-card";
import MusicPage from "@/main/components/music-page";
import MvCard from "@/main/components/mv-card";
import SongListItemCard from "@/main/components/song-list-item";
import type { Album, Music, Mv, PageData, SearchMusicResult } from "@/main/types";
import { Artist } from "@/main/types/artist";
import { SongListItem } from "@/main/types/song-list";
import { useParams, useSearchParams } from "react-router";
import useSWR from "swr";

export default function SearchPage() {
  const { type } = useParams<"type">();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  if (keyword === "") {
    return <h2>暂无数据</h2>;
  }
  switch (type) {
    case "artist":
      return <SearchArtist keyword={keyword} page={page} />;
    case "playlist":
      return <SearchPlaylist keyword={keyword} page={page} />;
    case "album":
      return <SearchAlbum keyword={keyword} page={page} />;
    case "mv":
      return <SearchMv keyword={keyword} page={page} />;
    default:
      return <SearchSongs keyword={keyword} page={page} />;
  }
}

interface SearchProps {
  keyword: string;
  page: number;
}

async function fetcher<R = unknown>(input: string): Promise<R> {
  const res = await fetch(input);
  const json: R = await res.json();
  if (res.ok) {
    return json;
  } else {
    console.error("fetch error", res);
    throw new Error("fetch error");
  }
}

function toMinute(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function searchMusicResultConverter(data: SearchMusicResult): PageData<Music> {
  return {
    total: Number(data.TOTAL),
    list: data.abslist.map(
      (d) =>
        ({
          musicrid: d.MUSICRID,
          artist: d.ARTIST,
          pic: "https://img2.kuwo.cn/star/albumcover/" + d.web_albumpic_short,
          rid: d.DC_TARGETID,
          album: d.ALBUM,
          albumid: d.ALBUMID,
          artistid: d.ARTISTID,
          albumpic: "https://img2.kuwo.cn/star/albumcover/" + d.web_albumpic_short,
          albuminfo: "",
          originalsongtype: 0,
          isListenFee: false,
          pic120: "https://img2.kuwo.cn/star/albumcover/" + d.web_albumpic_short,
          name: d.NAME,
          songTimeMinutes: toMinute(Number(d.DURATION)),
          url: "",
        } as unknown as Music),
    ),
  };
}

// https://www.kuwo.cn/search/searchMusicBykeyWord?vipver=1&client=kt&ft=music&cluster=0&strategy=2012&encoding=utf8&rformat=json&mobi=1&issubtitle=1&show_copyright_off=1&pn=0&rn=20&all=%E5%91%A8%E6%9D%B0%E4%BC%A6
function SearchSongs({ keyword, page }: SearchProps) {
  const { data, isLoading, error } = useSWR<SearchMusicResult>(
    `https://www.kuwo.cn/search/searchMusicBykeyWord?vipver=1&client=kt&ft=music&cluster=0&strategy=2012&encoding=utf8&rformat=json&mobi=1&issubtitle=1&show_copyright_off=1&pn=${
      page - 1
    }&rn=20&all=${keyword}`,
    fetcher,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    const { list, total } = searchMusicResultConverter(data);
    return (
      <MusicPage
        total={Number(total)}
        size={20}
        current={page}
        urlRender={(p) => `/search?keyword=${keyword}&page=${p}`}
        data={list}
      />
    );
  }
  return null;
}

function SearchArtist({ keyword, page }: SearchProps) {
  const { data, isLoading, error } = useSWR<PageData<Artist>>(
    `/api/www/search/searchArtistBykeyWord?key=${keyword}&pn=${page}&rn=30`,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    const { list, total } = data;
    return (
      <div>
        <div className="my-2 grid grid-cols-2 sm:col-span-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-1 md:gap-2 lg:gap-3">
          {list.map((a) => (
            <ArtistCard key={a.id} artist={a} />
          ))}
        </div>
        <Pagination
          total={total}
          current={page}
          size={30}
          urlRender={(p) => `/search/artist?keyword=${keyword}&page=${p}`}
        />
      </div>
    );
  }
}

function SearchAlbum({ keyword, page }: SearchProps) {
  const { data, isLoading, error } = useSWR<{ albumList: Album[]; total: string }>(
    `/api/www/search/searchAlbumBykeyWord?key=${keyword}&pn=${page}&rn=20`,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    const { albumList, total } = data;
    return (
      <div>
        <div className="card-grid">
          {albumList.map((a) => (
            <AlbumCard key={a.albumid} album={a} />
          ))}
        </div>
        <Pagination
          current={page}
          total={Number(total)}
          size={20}
          urlRender={(p) => `/search/album?keyword=${keyword}&page=${p}`}
        />
      </div>
    );
  }
}

function SearchPlaylist({ keyword, page }: SearchProps) {
  const { data, isLoading, error } = useSWR<PageData<SongListItem>>(
    `/api/www/search/searchPlayListBykeyWord?key=${keyword}&pn=${page}&rn=20`,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    const { list, total } = data;
    return (
      <div>
        <div className="my-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {list.map((item) => (
            <SongListItemCard key={item.id} item={item} />
          ))}
        </div>
        <Pagination
          total={total}
          size={20}
          current={page}
          urlRender={(p) => `/search/playlist?keyword=${keyword}&page=${p}`}
        />
      </div>
    );
  }
}

function SearchMv({ keyword, page }: SearchProps) {
  const { data, isLoading, error } = useSWR<{ mvlist: Mv[]; total: string }>(
    `/api/www/search/searchMvBykeyWord?key=${keyword}&pn=${page}&rn=20`,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    const { mvlist, total } = data;
    return (
      <div>
        <div className="card-grid mb-4 mt-2">
          {mvlist.map((m) => (
            <MvCard key={m.id} mv={m} />
          ))}
        </div>
        <Pagination
          total={Number(total)}
          size={20}
          current={page}
          urlRender={(p) => `/search/mv?keyword=${keyword}&page=${p}`}
        />
      </div>
    );
  }
}
