import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Music } from "../types";
import { usePlayerStore } from "../store/player";
import { Link } from "react-router";
import { Download, Heart, Play, Plus } from "lucide-react";
import { useDownloadStore } from "../store/download";
import { useLikeMusicStore } from "../store/like";

export interface MusicListProps {
  data: Music[];
  height?: React.CSSProperties["height"];
}

export default function MusicList({ data }: MusicListProps) {
  const play = usePlayerStore((s) => s.play);
  const appendToPlayerList = usePlayerStore((s) => s.appendToPlayerList);
  const download = useDownloadStore((s) => s.download);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">#</TableHead>
          <TableHead>操作</TableHead>
          <TableHead className="min-w-12"></TableHead>
          <TableHead>歌曲</TableHead>
          <TableHead>专辑</TableHead>
          <TableHead>歌手</TableHead>
          <TableHead>时长</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((m, i) => (
          <TableRow key={m.rid}>
            <TableCell className="text-center">{i + 1}</TableCell>
            <TableCell>
              <div className="flex gap-1 md:gap-2 items-center">
                <button onClick={() => play(m, data)} title="播放">
                  <Play size={14} />
                </button>
                <button onClick={() => appendToPlayerList(m)} title="添加到播放列表">
                  <Plus size={14} />
                </button>
                <button onClick={() => download(m)} title="下载">
                  <Download size={14} />
                </button>
                <LikeButton music={m} />
              </div>
            </TableCell>
            <TableCell className="min-w-12">
              <img src={m.pic120} width={48} alt={m.name} className="w-12 aspect-square rounded" />
            </TableCell>
            <TableCell>
              <Link to={"/music/" + m.rid}>
                <span>{m.name}</span>
              </Link>
            </TableCell>
            <TableCell>
              <Link to={"/artist/" + m.artistid}>{m.artist}</Link>
            </TableCell>
            <TableCell>
              <Link to={"/album/" + m.albumid}>{m.album}</Link>
            </TableCell>
            <TableCell>{m.songTimeMinutes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function LikeButton({ music }: { music: Music }) {
  const toggleLike = useLikeMusicStore((s) => s.toggle);
  const likes = useLikeMusicStore((s) => s.like);
  const isLike = likes.some((m) => m.rid === music.rid);

  return (
    <button onClick={() => toggleLike(music)} title={isLike ? "取消收藏" : "收藏"}>
      <Heart size={14} fill={isLike ? "red" : "none"} stroke={isLike ? "red" : "currentColor"} />
    </button>
  );
}
