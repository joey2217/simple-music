import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import { usePlayerStore } from "@/main/store/player";
import { Music } from "@/main/types";

export default function MusicInfo() {
  const current = usePlayerStore((s) => s.current);
  if (current) {
    return (
      <div className="flex gap-1">
        <Lyric music={current} />
        <div className="flex-1 truncate">
          <div className="text-lg font-semibold truncate leading-8">{current.name}</div>
          <div className="truncate leading-8 artists">
            <Link to={`/artist/${current.artistid}`}>
              <span className="underline-offset-4 hover:underline text-accent-foreground/80 hover:text-accent-foreground">
                {current.artist}
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function Lyric({ music }: { music: Music }) {
  const [open, setOpen] = useState(false);
  const paused = usePlayerStore((s) => s.paused);

  const animate = useMemo(() => !paused && open, [open, paused]);

  //   useEffect(() => {
  //     const close = () => setOpen(false);
  //     emitter.on("closeLyric", close);
  //     return () => emitter.off("closeLyric", close);
  //   }, []);

  return (
    <>
      <div className="group relative h-16 w-16 rounded overflow-hidden">
        <img className="w-full aspect-square" src={music.pic} alt={music.name} />
        <div
          onClick={() => setOpen((s) => !s)}
          className="w-full aspect-square absolute top-0 left-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {open ? <ChevronDown size={48} /> : <ChevronUp size={48} />}
        </div>
      </div>
      {ReactDOM.createPortal(
        <div
          id="lyric"
          className={`scrollbar text-center fixed top-0 left-0 w-full z-20 shadow-md bg-background/95 transition-all duration-300 ease-in-out ${
            open ? "translate-y-0 opacity-100" : "translate-y-[100vh] opacity-0"
          }`}
        >
          <div id="lyric-header">
            <div className="flex items-center mr-16 titleBar-ml">
              <button onClick={() => setOpen(false)} className="w-16" title="收起">
                <ChevronDown size={40} className="mx-auto" />
              </button>
              <div className="draggable flex-1 text-xl font-semibold">
                <h2>{music.name}</h2>
              </div>
            </div>
          </div>
          <div className="fixed w-1/4 -z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <img
              src={music.pic}
              alt={music.name}
              className="w-full rounded-full blur-sm animate-spin"
              style={{
                animationDuration: "20s",
                animationPlayState: animate ? "running" : "paused",
              }}
            />
          </div>
          <div className="h-10 z-30 flex gap-2 items-center text-sm justify-center">
            <span>歌手:</span>
            <div className="artists">
              <Link to={`/artist/${music.artistid}`} onClick={() => setOpen(false)}>
                <span className="underline-offset-4 hover:underline text-accent-foreground/80 hover:text-accent-foreground">
                  {music.artist}
                </span>
              </Link>
            </div>
            <span>专辑:</span>
            <Link to={`/album/${music.albumid}`} onClick={() => setOpen(false)}>
              <span className="underline-offset-4 hover:underline text-accent-foreground/80 hover:text-accent-foreground">
                {music.album}
              </span>
            </Link>
          </div>
          <div id="lyric-content" className="scrollbar">
            SongLyric TODO
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

// https://wapi.kuwo.cn/openapi/v1/www/lyric/getlyric?musicId=507064894&httpsStatus=1&reqId=f94b1670-a8da-11f0-adfb-610e4d724d94&plat=web_www&from=
