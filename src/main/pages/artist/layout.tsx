import PageHeader from "@/main/components/page-header";
import { useLikeArtistStore } from "@/main/store/like";
import { type ArtistInfo } from "@/main/types/artist";
import { Heart } from "lucide-react";
import { NavLink, Outlet, useParams } from "react-router";
import useSWR from "swr";

export default function ArtistLayout() {
  const toggleLike = useLikeArtistStore((s) => s.toggle);
  const likes = useLikeArtistStore((s) => s.like);
  const { id } = useParams<"id">();
  const { data: artistInfo, error, isLoading } = useSWR<ArtistInfo>(`/api/www/artist/artist?artistid=${id}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (artistInfo) {
    const isLike = likes.some((item) => item.id === artistInfo.id);
    return (
      <section>
        <PageHeader title={"歌手 : " + artistInfo.name} />
        <div className="flex gap-4">
          <img className="rounded-full w-40 h-40" src={artistInfo.pic300} alt={artistInfo.name} />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h3
                className="text-lg font-semibold"
                dangerouslySetInnerHTML={{
                  __html: artistInfo.name || "-",
                }}
              ></h3>
              <button onClick={() => toggleLike(artistInfo)} title={isLike ? "取消收藏" : "收藏"}>
                <Heart size={18} fill={isLike ? "red" : "none"} stroke={isLike ? "red" : "currentColor"} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <div>
                <span className="label">单曲</span>
                <span>{artistInfo.musicNum}</span>
              </div>
              <div>
                <span className="label">专辑</span>
                <span>{artistInfo.albumNum}</span>
              </div>
              <div>
                <span className="label">MV</span>
                <span>{artistInfo.mvNum}</span>
              </div>
              <div>
                <span className="label">粉丝</span>
                <span>{artistInfo.artistFans}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div>
                <span className="label">译名</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: artistInfo.aartist || "-",
                  }}
                ></span>
              </div>
              <div>
                <span className="label">国籍</span>
                <span>{artistInfo.country}</span>
              </div>
              <div>
                <span className="label">语言</span>
                <span>{artistInfo.language || "-"}</span>
              </div>
              <div>
                <span className="label">出生地</span>
                <span>{artistInfo.birthplace || "-"}</span>
              </div>
            </div>
          </div>
        </div>
        <nav className="flex my-4 gap-2">
          <NavLink className="link" to="" end>
            单曲
          </NavLink>
          <NavLink className="link" to="album">
            专辑
          </NavLink>
          <NavLink className="link" to="mv">
            MV
          </NavLink>
          <NavLink className="link" to="info">
            简介
          </NavLink>
        </nav>
        <div>
          <Outlet />
        </div>
      </section>
    );
  }
  return null;
}
