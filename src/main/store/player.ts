import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";
import { Music } from "../types";
import { Artist } from "../types/artist";
import { shuffle } from "../lib";
import { fetcher } from "../lib/request";

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

interface RootObject {
  code: number;
  msg: string;
  reqId: string;
  data: {
    url: string;
  };
  profileId: string;
  curTime: number;
  success: boolean;
}

export type MusicBr = 128 | 192 | 320 | 740 | 999;

// https://www.kuwo.cn/api/v1/www/music/playUrl?mid=507067633&type=music&httpsStatus=1&reqId=7a4ecb41-a999-11f0-bbfc-59a65a80edeb&plat=web_www&from=
// br=128kmp3
export function fetchMusicUrl(id: string | number, br: MusicBr = 128) {
  return fetcher<{ url: string }>(`/api/v1/www/music/playUrl?mid=${id}&type=music&httpsStatus=1&plat=web_www&from=`)
    .then((data) => data.url)
    .catch(() => null);
}
// br=[128/192/320/740/999]
// https://music-api.gdstudio.xyz/api.php?types=url&source=kuwo&id=507067633&br=320
async function gd(id: string | number, br: MusicBr = 128) {
  const res = await fetch(`https://music-api.gdstudio.xyz/api.php?types=url&source=kuwo&id=${id}&br=${br}`);
}
// https://api.bugpk.com/api/kuwo?url=https://www.kuwo.cn/play_detail/507067633
function fetchMusicPlayUrl(id: string | number, br: MusicBr = 128) {}

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
    this.initAutoPlay();
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

  private initAutoPlay() {
    const localData = localStorage.getItem("player");
    if (localData) {
      try {
        // 本地current不为空，则自动播放
        const data = JSON.parse(localData) as StorageValue<PlayerState>;
        this._autoPlay = data.state.current != null;
      } catch {
        /* empty */
      }
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
