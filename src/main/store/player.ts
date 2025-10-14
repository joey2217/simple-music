import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Music } from "../types";
import { Artist } from "../types/artist";
import { shuffle } from "../lib";

interface PlayerState {
  current: Music | null;
  seek: number;
  duration: number;
  playerList: Music[];
  paused: boolean;
  play: (m: Music) => void;
  playNext: (dir?: "next" | "prev") => void;
  appendToPlayerList: (m: Music | Music[], replace?: boolean) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      current: null,
      seek: 0,
      duration: 0,
      paused: true,
      playerList: [],
      play: (m: Music) => {
        set((state) => {
          playerConfig.index = state.playerList.length;
          return {
            playerList: [...state.playerList, m],
            current: m,
          };
        });
      },
      playNext: (dir: "next" | "prev" = "next") => {
        const { playerList } = get();
        const index = playerConfig.index;
        let current: Music | null = null;
        if (dir === "next") {
          const i = index + 1 > playerList.length - 1 ? 0 : index + 1;
          playerConfig.index = i;
          current = playerList[i];
          set({
            current,
          });
        } else {
          const i = index - 1 < 0 ? playerList.length - 1 : index - 1;
          playerConfig.index = i;
          current = playerList[i];
          set({
            current,
          });
        }
      },
      appendToPlayerList(m, replace = false) {
        if (Array.isArray(m)) {
          if (replace) {
            set({
              playerList: m,
              current: m[0],
            });
            playerConfig.index = 0;
          } else {
            set((state) => {
              const ids = state.playerList.map((m) => m.rid);
              const items = m.filter((m) => !ids.includes(m.rid));
              return {
                playerList: [...state.playerList, ...items],
              };
            });
          }
        } else {
          set((state) => ({
            playerList: [...state.playerList, m],
          }));
        }
      },
    }),
    { name: "player" },
  ),
);

// https://music-api.gdstudio.xyz/api.php
// API：https://music-api.gdstudio.xyz/api.php?types=url&source=[MUSIC SOURCE]&id=[TRACK ID]&br=[128/192/320/740/999]
// https://music-api.gdstudio.xyz/api.php?types=url&source=kuwo&id=228491562&br=320
interface MusicResponse {
  url: string;
  size: number;
  br: number;
  from: string;
}

export type MusicBr = 128 | 192 | 320 | 740 | 999;

export async function fetchMusicUrl(id: string | number, br: MusicBr = 128) {
  const res = await fetch(`https://music-api.gdstudio.xyz/api.php?types=url&source=kuwo&id=${id}&br=${br}`, {
    cache: "force-cache",
  });
  if (res.ok) {
    const data: MusicResponse = await res.json();
    if (data.url) {
      return data.url;
    } else {
      throw new Error("Failed to fetch music url");
    }
  } else {
    throw new Error("Failed to fetch music url");
  }
}

export function usePlayer() {}

export interface PlayerMusic {
  id?: string;
  copyrightId: string;
  title: string;
  artist: string;
  artists: Artist[];
  album?: string;
  albumId?: string;
  pic: string;
  url?: string;
}

export interface LyricRow {
  time?: number;
  words: string;
}

export type PlayMode = "sequence" | "loop" | "repeat" | "shuffle";

const VOL_KEY = "vol";
const MODE_KEY = "play_mode";
const LOCAL_INDEX = "play-index";

class PlayerConfig {
  private _volume = 100;
  private _mode: PlayMode = "sequence";
  private _index = 0;
  private _autoPlay = false;
  private _shuffleIndexList: number[] = [];

  constructor() {
    this.initVol();
    this.initMode();
    this.initIndex();
  }

  private initVol() {
    const localData = localStorage.getItem(VOL_KEY);
    if (localData) {
      const num = Number(localData);
      if (!Number.isNaN(num)) {
        this._volume = num;
      }
    }
  }

  private initMode() {
    const localData = localStorage.getItem(MODE_KEY);
    if (localData) {
      this._mode = localData as PlayMode;
    }
  }

  private initIndex() {
    const localData = localStorage.getItem(LOCAL_INDEX);
    if (localData) {
      this._index = Number(localData) || 0;
    }
  }

  get mode() {
    return this._mode;
  }
  set mode(newMode: PlayMode) {
    this._mode = newMode;
    localStorage.setItem(MODE_KEY, newMode);
  }

  get index() {
    return this._index;
  }
  set index(newIndex: number) {
    this._index = newIndex;
    localStorage.setItem(LOCAL_INDEX, newIndex.toString());
  }

  get volume() {
    return this._volume;
  }
  set volume(newVolume: number) {
    this._volume = newVolume;
    localStorage.setItem(VOL_KEY, newVolume.toString());
  }

  get autoplay() {
    return this._autoPlay;
  }

  set autoplay(newAutoPlay: boolean) {
    this._autoPlay = newAutoPlay;
  }

  get shuffleIndexList() {
    return this._shuffleIndexList;
  }

  setShuffleIndexList(l: number) {
    if (l > 0) {
      this._shuffleIndexList = shuffle(Array.from({ length: l }, (_item, i) => i));
    } else {
      this._shuffleIndexList = [];
    }
  }
}

export const playerConfig = new PlayerConfig();
