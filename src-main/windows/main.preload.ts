import { contextBridge, ipcRenderer } from "electron";
import { version } from "../../package.json";
import type { DownloadInfo, Theme } from "../types";

/**
 * Sandboxed preload scripts can't use ESM imports
 * https://www.electronjs.org/zh/docs/latest/tutorial/esm#preload-%E8%84%9A%E6%9C%AC
 */
contextBridge.exposeInMainWorld("devAPI", {
  toggleDevtools: () => ipcRenderer.invoke("dev:toggle_devtools"),
});

// renderer -> main
contextBridge.exposeInMainWorld("electronAPI", {
  download: (files: DownloadInfo[]) => ipcRenderer.invoke("download:files", files),
  getDownloadsPath: () => ipcRenderer.invoke("download:get_path"),
  checkUpdate: (status?: "auto" | "hint" | "manual") => ipcRenderer.invoke("app:check_for_update", status),
  openExternal: (url: string) => ipcRenderer.invoke("app:open_external", url),
  setTheme: (theme: Theme) => ipcRenderer.invoke("app:set_theme", theme),
  showItemInFolder: (fullPath: string) => ipcRenderer.invoke("app:show_item_in_folder", fullPath),
  openPath: (fullPath: string) => ipcRenderer.invoke("app:open_path", fullPath),
  showOpenDialog: (options: Electron.OpenDialogOptions) => ipcRenderer.invoke("app:open_dialog", options),
  setMusicPaused: (paused: boolean) => ipcRenderer.invoke("music:paused", paused),
  setAppTitle: (title?: string) => ipcRenderer.invoke("app:title", title),
});

function addListener(channel: string, callback: (...args: unknown[]) => void) {
  const listener = (_event: Electron.IpcRendererEvent, ...args: unknown[]) => callback(...args);
  ipcRenderer.on(channel, listener);
  return () => ipcRenderer.off(channel, listener);
}

// main -> renderer
contextBridge.exposeInMainWorld("messageAPI", {
  onUpdateDownload: (callback: (info: DownloadInfo) => void) => addListener("on:download:update", callback),
  onMusicControl: (callback: (type: "prev" | "play" | "pause" | "next") => void) =>
    addListener("on:music_control", callback),
});

contextBridge.exposeInMainWorld("argv", {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  version,
  platform: process.platform,
  dev: process.argv.includes("--dev"),
});
