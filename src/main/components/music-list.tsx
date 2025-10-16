import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Music } from "../types";
import { usePlayerStore } from "../store/player";
import { Link } from "react-router";
import { Play, Plus } from "lucide-react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

export interface MusicListProps {
  data: Music[];
  height?: React.CSSProperties["height"];
}

export default function MusicList({ data }: MusicListProps) {
  const { play, appendToPlayerList } = usePlayerStore();

  return (
    <ContextMenu>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">#</TableHead>
            <TableHead>操作</TableHead>
            <TableHead></TableHead>
            <TableHead>歌曲</TableHead>
            <TableHead>专辑</TableHead>
            <TableHead>歌手</TableHead>
            <TableHead>时长</TableHead>
          </TableRow>
        </TableHeader>
        <ContextMenuTrigger asChild>
          <TableBody>
            {data.map((m, i) => (
              <TableRow key={m.rid}>
                <TableCell className="text-center">{i + 1}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <button onClick={() => play(m)} title="播放">
                      <Play size={14} />
                    </button>
                    <button onClick={() => appendToPlayerList(m)} title="添加到播放列表">
                      <Plus size={14} />
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <img src={m.pic120} alt={m.name} className="w-12 aspect-square rounded" />
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
        </ContextMenuTrigger>
      </Table>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
