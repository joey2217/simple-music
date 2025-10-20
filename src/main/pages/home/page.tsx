import ArtistCard, { ArtistCardSkeleton } from "@/main/components/artist-card";
import SongListItemCard from "@/main/components/song-list-item";
import { fetcher } from "@/main/lib/request";
import { usePlayerStore } from "@/main/store/player";
import { Music, Ranking, Tag } from "@/main/types";
import { ArtistsResponse } from "@/main/types/artist";
import { SongListItem } from "@/main/types/song-list";
import { ChevronRight, Play, Plus } from "lucide-react";
import { PropsWithChildren, useEffect, useState } from "react";
import { Link } from "react-router";
import useSWR from "swr";

export default function Home() {
  return (
    <>
      <Card title="排行榜" url="/ranking">
        <Rankings />
      </Card>
      <Card title="推荐歌单" url="/song-list">
        <Playlist />
      </Card>
      <ArtistsCard />
    </>
  );
}

function Card({ title, url, children }: PropsWithChildren<{ title: string; url: string }>) {
  return (
    <>
      <div className="flex items-baseline gap-4">
        <h2 className="font-semibold text-2xl">{title}</h2>
        <Link to={url} className="flex items-center hover:text-neutral-500 dark:hover:text-white">
          <span>更多</span>
          <ChevronRight />
        </Link>
      </div>
      {children}
    </>
  );
}

/**
 * 排行榜
 */
function MusicItem({ item, num, list }: { item: Music; num: number; list: Music[] }) {
  const play = usePlayerStore((s) => s.play);
  const appendToPlayerList = usePlayerStore((s) => s.appendToPlayerList);
  return (
    <div className="flex items-center py-2 gap-1">
      <div className="w-6 shrink-0 text-center">{num}</div>
      <div className="flex-1 truncate flex flex-col gap-1">
        <Link
          to={"/music/" + item.rid}
          className="truncate cursor-pointer hover:font-semibold text-gray-900 hover:text-gray-900/50 dark:text-gray-100 dark:hover:text-gray-100/50"
          title={item.name}
        >
          {item.name}
        </Link>
        <Link
          to={"/artist/" + item.artistid}
          className="truncate text-sm cursor-pointer text-gray-600 hover:text-gray-600/50 dark:text-gray-400 dark:hover:text-gray-400/50"
          title={item.artist}
        >
          {item.artist}
        </Link>
      </div>
      <button onClick={() => play(item, list)} title="播放">
        <Play size={14} />
      </button>
      <button onClick={() => appendToPlayerList(item)} title="添加到播放列表">
        <Plus size={14} />
      </button>
    </div>
  );
}

function RankingItem({ item }: { item: Ranking }) {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md overflow-hidden">
      <div
        className="relative text-white bg-cover flex items-center justify-center bg-no-repeat bg-center bg-gray-800 aspect-video"
        style={{
          backgroundImage: `url(${item.pic})`,
        }}
      >
        <div className="flex w-full h-full items-center justify-center bg-gray-900/50">
          <h3 className="text-2xl font-semibold tracking-widest">{item.name.slice(2)}</h3>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-end justify-end  opacity-0 hover:opacity-95">
          <button className="text-4xl p-3 m-3 bg-gray-600/70 rounded-full" title="播放">
            <Play />
          </button>
        </div>
      </div>
      <div className="p-2">
        {item.musicList.map((m, index) => (
          <MusicItem key={m.rid} item={m} num={index + 1} list={item.musicList} />
        ))}
      </div>
    </div>
  );
}

function Rankings() {
  const { data, error, isLoading } = useSWR<Ranking[]>("/api/www/bang/index/bangList", fetcher);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-4">
        {data.map((item) => (
          <RankingItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
  return null;
}

/**
 * 推荐歌单
 */
function Playlist() {
  const { data, error, isLoading } = useSWR<{ list: SongListItem[] }>(
    "/api/www/rcm/index/playlist?id=rcm&pn=1&rn=5",
    fetcher,
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 my-4">
        {data.list.slice(0, 5).map((item) => (
          <SongListItemCard key={item.id} item={item} />
        ))}
      </div>
    );
  }
  return null;
}
/**
 * 歌手推荐
 */

function ArtistsCard() {
  const [tagId, setTagId] = useState("");
  return (
    <>
      <div className="flex items-baseline gap-4">
        <h2 className="font-semibold text-2xl">歌手推荐</h2>
        <ArtistTags tagId={tagId} setTagId={setTagId} />
        <Link to="/artists" className="flex items-center hover:text-neutral-500 dark:hover:text-white">
          <span>更多</span>
          <ChevronRight />
        </Link>
      </div>
      {tagId ? <Artists category={tagId} /> : <ArtistsSkeleton />}
    </>
  );
}

function ArtistsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 my-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <ArtistCardSkeleton key={index} />
      ))}
    </div>
  );
}

function ArtistTags({ tagId, setTagId }: { tagId: string; setTagId: (tag: string) => void }) {
  const { data, error, isLoading } = useSWR<Tag[]>("/api/www/artist/index/tags", fetcher);

  useEffect(() => {
    if (data && !tagId) {
      setTagId(data[0].id);
    }
  }, [data, setTagId, tagId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return data.map((tag) => (
      <div
        key={tag.id}
        className={`cursor-pointer hover:text-neutral-500 dark:hover:text-white ${
          tagId === tag.id ? "underline underline-offset-8" : "text-gray-600 dark:text-gray-400"
        }`}
        onClick={() => setTagId(tag.id)}
      >
        {tag.name}
      </div>
    ));
  }
  return null;
}

function Artists({ category }: { category: string }) {
  const { data, error, isLoading } = useSWR<ArtistsResponse>(
    `/api/www/artist/artistInfo?category=${category}&pn=1&rn=6`,
    fetcher,
  );
  if (isLoading) {
    return <ArtistsSkeleton />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 my-4">
        {data.artistList.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    );
  }
  return null;
}
