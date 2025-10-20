import { useCallback, useEffect, useRef } from "react";
import { Howl } from "howler";
import Control from "./control";
import MusicInfo from "./music-info";
import PlayerList from "./player-list";
import Volume from "./volume";
import { fetchMusicUrl, player, playerConfig, usePlayerStore } from "@/main/store/player";
import emitter from "@/main/lib/emitter";

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

  const current = usePlayerStore((s) => s.current);
  const paused = usePlayerStore((s) => s.paused);

  const playNext = usePlayerStore((s) => s.playNext);

  // https://github.com/goldfire/howler.js/blob/master/examples/player/player.js
  const step = useCallback(function s() {
    const howler = howlerRef.current;
    if (howler) {
      usePlayerStore.setState({
        seek: Math.ceil(howler.seek()),
      });
      if (howler.playing()) {
        requestAnimationFrame(s);
      }
    }
  }, []);

  useEffect(() => {
    // console.log("player", current);
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
        playerConfig.autoplay = true;
        howlerRef.current = howler;
        howler.once("load", () => {
          usePlayerStore.setState({
            duration: Math.ceil(howler.duration()),
            seek: 0,
            paused: true,
          });
        });
        howler.on("seek", () => {
          console.log("on seek");
        });
        howler.on("play", () => {
          usePlayerStore.setState({
            paused: false,
          });
          requestAnimationFrame(step);
        });

        howler.on("pause", () => {
          usePlayerStore.setState({
            paused: true,
          });
        });

        howler.once("end", () => {
          console.log("end", playerConfig.mode);
          if (playerConfig.mode !== "repeat") {
            playNext();
          }
        });
      });
    }

    return () => {
      howlerRef.current?.unload();
      howlerRef.current = null;
    };
  }, [current, playNext, step]);

  useEffect(() => {
    const play = () => howlerRef.current?.play();
    const pause = () => howlerRef.current?.pause();
    const volume = (v: number) => howlerRef.current?.volume(v / 100);
    const seek = (v: number) => {
      const howler = howlerRef.current;
      if (howler) {
        howler.seek(v);
        usePlayerStore.setState({
          seek: v,
        });
        if (!howler.playing()) {
          howler.play();
        }
      }
    };
    const loop = (loop: boolean) => howlerRef.current?.loop(loop);

    emitter.on("play", play);
    emitter.on("pause", pause);
    emitter.on("volume", volume);
    emitter.on("seek", seek);
    emitter.on("loop", loop);
    return () => {
      emitter.off("play", play);
      emitter.off("pause", pause);
      emitter.off("volume", volume);
      emitter.off("seek", seek);
      emitter.off("loop", loop);
    };
  }, []);

  useEffect(() => {
    return window.mainListener.onMusicControl((type) => {
      switch (type) {
        case "next":
        case "prev":
          playNext(type);
          break;
        case "pause":
          player.pause();
          break;
        case "play":
          player.play();
          break;
        default:
          break;
      }
    });
  }, [playNext]);

  useEffect(() => {
    if (current) {
      const title = `${current.name}-${current.artist}`;
      window.mainAPI.setMusicPaused(paused);
      window.mainAPI.setAppTitle(title);
      document.title = title;
    } else {
      window.mainAPI.setAppTitle();
      document.title = "轻·音乐";
    }
  }, [paused, current]);

  return null;
}
