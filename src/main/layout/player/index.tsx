import { useEffect, useRef } from "react";
import { Howl } from "howler";
import Control from "./control";
import MusicInfo from "./music-info";
import PlayerList from "./player-list";
import Volume from "./volume";
import { fetchMusicUrl, playerConfig, usePlayerStore } from "@/main/store/player";

export default function Player() {
  return (
    <>
      <footer
        id="player"
        className="px-2 grid grid-cols-12 items-center gap-2 bg-base-300 fixed bottom-0 left-0 w-full z-40"
      >
        <div className="col-span-3">
          <MusicInfo />
        </div>
        <div className="col-span-8 md:col-span-6">
          <Control />
        </div>
        <div className="hidden md:block md:col-span-1">
          <Volume />
        </div>
        <div className="col-span-2">
          <PlayerList />
        </div>
      </footer>
      <HowlerPlayer />
    </>
  );
}

function HowlerPlayer() {
  const howlerRef = useRef<Howl | null>(null);
  const timer = useRef<NodeJS.Timeout>(undefined);

  const current = usePlayerStore((s) => s.current);
  const playNext = usePlayerStore((s) => s.playNext);

  useEffect(() => {
    if (current) {
      fetchMusicUrl(current.rid).then((url) => {
        current.url = url;
        howlerRef.current?.unload();
        const howler = new Howl({
          src: url,
          autoplay: playerConfig.autoplay,
          loop: playerConfig.mode === "repeat",
          html5: true,
          volume: playerConfig.volume / 100,
        });
        howlerRef.current = howler;
        howler.once("load", () => {
          usePlayerStore.setState({
            duration: Math.ceil(howler.duration()),
            seek: 0,
            paused: true,
          });
          clearInterval(timer.current);
          timer.current = undefined;
        });
        howler.on("seek", () => {
          console.log("on seek");
        });
        howler.on("play", () => {
          usePlayerStore.setState({
            paused: false,
          });
          if (!timer.current) {
            timer.current = setInterval(() => {
              usePlayerStore.setState({
                seek: Math.ceil(howler.seek()),
              });
            }, 1000);
          }
        });

        howler.on("pause", () => {
          usePlayerStore.setState({
            paused: true,
          });
          clearInterval(timer.current);
          timer.current = undefined;
        });

        howler.once("end", () => {
          console.log("end", playerConfig.mode);
          if (playerConfig.mode !== "repeat") {
            clearInterval(timer.current);
            playNext();
          }
        });
      });
    } else {
      clearInterval(timer.current);
      timer.current = undefined;
    }

    return () => {
      clearInterval(timer.current);
      timer.current = undefined;
      howlerRef.current?.unload();
      howlerRef.current = null;
    };
  }, [current, playNext]);

  return null;
}
