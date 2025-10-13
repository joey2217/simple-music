import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Music } from "../types";

interface PlayerState {
  current: Music | null;
  play: (m: Music) => Promise<void>;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      current: null,
      play: (m: Music) => {
        return fetchMusicUrl(m.rid)
          .then((url) => {
            set(() => ({
              current: {
                ...m,
                url,
              },
            }));
          })
          .catch((error) => {
            console.error(error);
            // TODO handle error
            throw error;
          });
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

async function fetchMusicUrl(id: string | number, br: MusicBr = 128) {
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