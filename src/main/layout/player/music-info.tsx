import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Play } from "lucide-react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import { player, usePlayerStore } from "@/main/store/player";
import { Music } from "@/main/types";
import useSWR from "swr";
import emitter from "@/main/lib/emitter";

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

  useEffect(() => {
    const close = () => setOpen(false);
    emitter.on("closeLyric", close);
    return () => emitter.off("closeLyric", close);
  }, []);

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
          id="lyric-container"
          className={`scrollbar text-center fixed top-0 left-0 w-full h-screen z-20 shadow-md bg-background/95 transition-all duration-300 ease-in-out flex items-center justify-center gap-12 overflow-hidden p-4 md:p-10
            ${open ? "translate-y-0 opacity-100" : "translate-y-[100vh] opacity-0"}`}
        >
          <div className="fixed top-0 left-0  titleBar-ml">
            <button onClick={() => setOpen(false)} className="w-16" title="收起">
              <ChevronDown size={40} className="mx-auto" />
            </button>
          </div>
          {/* Left: Album Art (Hidden on mobile if lyrics shown, or smaller) */}
          <div className="shrink-0 opacity-80 hidden md:block max-w-xs md:max-w-sm">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border relative shadow-indigo-500/20">
              <img src={music.pic} alt={music.name} className="w-full h-full object-cover" />
              {/* Vinyl Shine Effect */}
              <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none" />
            </div>

            {/* Metadata (Desktop Only View) */}
            <div className="mt-8 hidden md:block text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">{music.name}</h1>
              <Link to={`/artist/${music.artistid}`}>
                <p className="text-lg text-foreground/60">{music.artist}</p>
              </Link>
            </div>
          </div>

          {/* Right: Lyrics View */}
          <div className="grow h-9/10 flex flex-col relative rounded-3xl bg-background/20 backdrop-blur-md border overflow-hidden shadow-inner">
            <SongLyric musicId={music.rid} />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

// https://www.kuwo.cn/openapi/v1/www/lyric/getlyric?musicId=518698250&httpsStatus=1&reqId=492bef70-cf1e-11f0-94af-2bd8019dfaea&plat=web_www&from=
// https://wapi.kuwo.cn/openapi/v1/www/lyric/getlyric?musicId=507064894&httpsStatus=1&reqId=f94b1670-a8da-11f0-adfb-610e4d724d94&plat=web_www&from=
// {
//     "lineLyric": "深山 - 王宇宙Leto",
//     "time": "0.0"
// }
interface LyricRow {
  lineLyric: string;
  time: number;
}

function SongLyric({ musicId }: { musicId: number }) {
  const { data, isLoading, error } = useSWR<{ lrclist: LyricRow[] }>(
    `/openapi/v1/www/lyric/getlyric?musicId=${musicId}`,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    const lyrics = data.lrclist.map((item) => ({
      ...item,
      time: Number(item.time),
    }));
    return <MusicLyric lyrics={lyrics} />;
  }
  return null;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
const LINE_HEIGHT = 48; // Height in pixels for each lyric line (matches h-12 in Tailwind)

function MusicLyric({ lyrics }: { lyrics: LyricRow[] }) {
  const currentTime = usePlayerStore((s) => s.seek);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [dragHighlightIndex, setDragHighlightIndex] = useState<number | null>(null);

  const activeIndex = useMemo(() => {
    return lyrics.findIndex((line, index) => {
      const nextLine = lyrics[index + 1];
      return line.time <= currentTime && (!nextLine || nextLine.time > currentTime);
    });
  }, [lyrics, currentTime]);

  // Handle automatic scrolling
  useEffect(() => {
    if (isUserScrolling || !containerRef.current) return;

    if (activeIndex !== -1) {
      const container = containerRef.current;
      const targetScroll = activeIndex * LINE_HEIGHT;
      // Calculate offset to center the active line
      const offset = container.clientHeight / 2 - LINE_HEIGHT / 2;

      container.scrollTo({
        top: Math.max(0, targetScroll - offset),
        behavior: "smooth",
      });
    }
  }, [activeIndex, isUserScrolling]);

  // Handle manual scroll interactions
  const handleScroll = () => {
    if (!containerRef.current) return;

    // We only care about detecting user interaction here.
    // If we haven't flagged it as user scrolling yet, do so now.
    // However, we need to distinguish between "auto scroll" and "user scroll".
    // A simple heuristic is: if we are close to the target auto-scroll position, it might be auto.
    // But a robust way is to set a flag 'ignoreScroll' when we programmatically scroll.
    // For simplicity in this demo, we assume any scroll event while NOT auto-updating is user.
    // To fix the "auto scroll triggers onScroll" loop, we can just check isUserScrolling state management elsewhere.

    // Actually, simpler approach: Always update the drag highlight index based on scroll position.
    // Just decide whether to apply the "snap back" logic.

    const container = containerRef.current;
    const centerPosition = container.scrollTop + container.clientHeight / 2;
    const indexAtCenter = Math.floor(centerPosition / LINE_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(indexAtCenter, lyrics.length - 1));

    setDragHighlightIndex(clampedIndex);

    // Reset the "snap back to active" timer
    setIsUserScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = window.setTimeout(() => {
      setIsUserScrolling(false);
      setDragHighlightIndex(null);
    }, 3000); // Snap back after 3 seconds of inactivity
  };

  const handleSeekToLine = (time: number) => {
    player.seek(time);
    setIsUserScrolling(false);
    setDragHighlightIndex(null);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
  };

  return (
    <div className="relative overflow-hidden group">
      {/* Central Guidelines (Visual Aid for Dragging) */}
      {isUserScrolling && dragHighlightIndex !== null && (
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-between px-4 pointer-events-none z-20">
          <div className="h-px bg-background/30 flex-1 mr-4"></div>
          <div className="text-foreground/80 text-xs font-mono font-bold bg-background/20 px-2 py-1 rounded backdrop-blur-md">
            {formatTime(lyrics[dragHighlightIndex]?.time || 0)}
          </div>
          <div className="h-px bg-background/30 flex-1 ml-4"></div>
        </div>
      )}

      {/* Play Button Indicator for Dragging */}
      {isUserScrolling && dragHighlightIndex !== null && (
        <button
          onClick={() => handleSeekToLine(lyrics[dragHighlightIndex].time)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-foreground/10 hover:bg-foreground/30 backdrop-blur-md transition-all animate-in fade-in zoom-in duration-200 cursor-pointer pointer-events-auto"
          aria-label="Seek to this line"
        >
          <Play size={20} fill="currentColor" className="text-foreground ml-1" />
        </button>
      )}

      {/* Scrolling Container */}
      {/* Note: We use padding-y so the first and last items can reach the center */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        // Hide scrollbar but keep functionality
        className="h-full w-full overflow-y-auto scrollbar-hide snap-y snap-proximity relative"
        style={{ scrollBehavior: isUserScrolling ? "auto" : "smooth" }}
      >
        <div
          className="w-full"
          // style={{
          //   paddingTop: "50%",
          //   paddingBottom: "50%",
          // }}
        >
          {lyrics.map((line, index) => {
            const isActive = index === activeIndex;
            const isDragged = isUserScrolling && index === dragHighlightIndex;

            // Determine opacity and scale based on distance from active/dragged
            let opacity = "opacity-40";
            let scale = "scale-95";
            let blur = "blur-[1px]";
            let color = "text-foreground/60";

            if (isUserScrolling) {
              if (isDragged) {
                opacity = "opacity-100";
                scale = "scale-105";
                blur = "blur-none";
                color = "text-foreground";
              }
            } else {
              if (isActive) {
                opacity = "opacity-100";
                scale = "scale-110";
                blur = "blur-none";
                color = "text-foreground font-bold drop-shadow-lg";
              }
            }

            return (
              <div
                key={index}
                className={`
                  h-12 flex items-center justify-center text-center px-4 transition-all duration-300 ease-out origin-center
                  ${opacity} ${scale} ${blur} ${color}
                `}
                // Allow clicking a line to seek directly even without dragging
                onClick={() => !isUserScrolling && handleSeekToLine(line.time)}
                data-t={line.time}
              >
                <span className="cursor-pointer hover:text-white transition-colors">{line.lineLyric}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlay Gradients to smooth out top/bottom edges */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-black/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/80 to-transparent pointer-events-none z-10" />
    </div>
  );
}
