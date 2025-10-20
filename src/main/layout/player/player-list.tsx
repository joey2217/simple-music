import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/main/store/player";
import { ArrowDownToLine, ListMusic, PlayIcon, X } from "lucide-react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useDownloadStore } from "@/main/store/download";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PlayerList() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const playerList = usePlayerStore((s) => s.playerList);
  const play = usePlayerStore((s) => s.play);
  const current = usePlayerStore((s) => s.current);
  const download = useDownloadStore((s) => s.download);
  const remove = usePlayerStore((s) => s.delete);
  const clear = usePlayerStore((s) => s.clear);

  function onClear() {
    setOpen(true);
  }

  function onConfirm() {
    clear();
    setOpen(false);
  }

  return (
    <>
      <div className="h-full flex items-center justify-center gap-4">
        <Button variant={show ? "default" : "outline"} size="icon" onClick={() => setShow((s) => !s)}>
          <ListMusic />
        </Button>
      </div>
      {ReactDOM.createPortal(
        <div
          id="player-list"
          className="fixed right-0 z-50 p-2 rounded-md shadow-md bg-background/95  select-none"
          style={{
            transform: show ? "translateX(0)" : "translateX(100%)",
            transitionDuration: "300ms",
          }}
        >
          <div className="flex gap-2">
            <h2 className="text-lg font-semibold mr-auto">播放列表({playerList.length})</h2>
            <Button onClick={onClear} variant="link">
              清空
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShow(false)}>
              <X />
            </Button>
          </div>
          <div
            style={{
              height: "calc(100% - 40px)",
            }}
            className="overflow-auto"
          >
            <Table>
              <TableBody>
                {playerList.map((item) => {
                  const playing = current?.rid === item.rid;
                  return (
                    <TableRow
                      key={item.rid}
                      className="play-list-row"
                      onDoubleClick={() => play(item, [])}
                      data-rid={item.rid}
                    >
                      <TableCell className={`group ${playing ? "text-primary" : ""}`}>
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <img src={item.pic} className="w-10 h-10 rounded-md" alt={item.name} />
                            <div
                              className={`absolute left-0 top-0 w-full h-full flex justify-center items-center ${
                                playing ? "opacity-100" : "opacity-0"
                              } group-hover:opacity-100 transition-opacity duration-300 cursor-pointer`}
                              onClick={() => play(item, [])}
                            >
                              <PlayIcon />
                            </div>
                          </div>
                          <div className="w-60 truncate">
                            <div className="w-60 truncate text-base">{item.name}</div>
                            <div className="w-60 truncate text-sm text-neutral-content">{item.artist}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon-sm" variant="outline" onClick={() => download(item)} title="下载">
                            <ArrowDownToLine />
                          </Button>
                          <Button size="icon-sm" variant="outline" onClick={() => remove(item)} title="删除">
                            <X />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>,
        document.body,
      )}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>清空播放列表</AlertDialogTitle>
            <AlertDialogDescription>确认要清空播放列表吗?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>确定</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
