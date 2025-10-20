import type { DownloadInfo } from "src/renderer";
import { create } from "zustand";
import type { Music } from "../types";
import { fetchMusicUrl } from "./player";
import { setting } from "../lib/setting";

interface DownloadState {
  list: DownloadInfo[];
  delete: (item: DownloadInfo) => void;
  update: (item: DownloadInfo) => void;
  download: (m: Music) => Promise<void>;
}

export const useDownloadStore = create<DownloadState>()((set) => ({
  list: [],
  delete: (item: DownloadInfo) => set((state) => ({ list: state.list.filter((i) => i.rid !== item.rid) })),
  update: (item: DownloadInfo) =>
    set((state) => {
      const index = state.list.findIndex((i) => i.rid === item.rid);
      if (index === -1) {
        return state;
      }
      return { list: state.list.toSpliced(index, 1, item) };
    }),
  download: async (m: Music) => {
    const playUrl = await fetchMusicUrl(m.rid);
    const url = new URL(playUrl);
    const ext = url.pathname.split(".").pop();
    const item: DownloadInfo = {
      rid: m.rid,
      url: playUrl,
      fileName: m.name,
      downloadPath: `${setting.downloadDir}/${m.artist}-${m.name}.${ext}`,
      title: m.name,
      artist: m.artist,
      album: m.album || "",
      cover: m.pic,
      status: "init",
    };
    await window.mainAPI.download([item]);
    set((state) => ({
      list: [item, ...state.list],
    }));
  },
}));
