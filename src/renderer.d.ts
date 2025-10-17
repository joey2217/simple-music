import Electron from "electron";

export type UpdateType = 'auto' | 'hint' | 'manual'

export type DownloadStatus = "init" | "downloading" | "completed" | "failed";

export interface DownloadInfo {
  fileName: string;
  downloadPath: string;
  rid: number;
  url: string;
  title: string;
  artist: string;
  album: string;
  status: DownloadStatus;
  lyric?: string;
  cover?: string;
}

export interface ImainAPI {
  download: (files: DownloadInfo[]) => Promise<void>;
  getDownloadsPath: () => Promise<string>;
  checkUpdate: (type?: "auto" | "hint" | "manual") => Promise<string>;
  openExternal: (url: string) => Promise<void>;
  setTheme: (theme: Theme) => Promise<void>;
  showItemInFolder: (fullPath: string) => Promise<void>;
  openPath: (fullPath: string) => Promise<string>;
  showOpenDialog: (options: Electron.OpenDialogOptions) => Promise<Electron.OpenDialogReturnValue>;
  setMusicPaused: (paused: boolean) => Promise<void>;
  setAppTitle: (title?: string) => Promise<void>;
}

export type RemoveListener = () => void;

export interface mainListener {
  onUpdateDownload: (callback: (info: DownloadInfo) => void) => RemoveListener;
  onMusicControl: (callback: (type: "prev" | "play" | "pause" | "next") => void) => RemoveListener;
}

export interface IDevAPI {
  toggleDevtools: () => Promise<void>;
}

export interface Argv {
  node: string;
  chrome: string;
  electron: string;
  version: string;
  dev: boolean;
  platform: "aix" | "darwin" | "freebsd" | "linux" | "openbsd" | "sunos" | "win32";
}

declare global {
  interface Window {
    mainAPI: ImainAPI;
    mainListener: mainListener;
    devAPI: IDevAPI;
    argv: Argv;
  }
}
