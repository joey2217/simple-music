import { contextBridge, ipcRenderer } from 'electron'
import { version } from '../../package.json'
import type { DownloadInfo, Theme } from '../types'

/**
 * Sandboxed preload scripts can't use ESM imports
 * https://www.electronjs.org/zh/docs/latest/tutorial/esm#preload-%E8%84%9A%E6%9C%AC
 */
contextBridge.exposeInMainWorld('devAPI', {
  toggleDevtools: () => ipcRenderer.invoke('TOGGLE_DEVTOOLS'),
})

// renderer -> main
contextBridge.exposeInMainWorld('electronAPI', {
  download: (files: DownloadInfo[]) =>
    ipcRenderer.invoke('DOWNLOAD_FILES', files),
  getDownloadsPath: () => ipcRenderer.invoke('GET_DOWNLOADS_PATH'),
  checkUpdate: (status?: 'auto' | 'hint' | 'manual') =>
    ipcRenderer.invoke('CHECK_FOR_UPDATE', status),
  openExternal: (url: string) => ipcRenderer.invoke('OPEN_EXTERNAL', url),
  setTheme: (theme: Theme) => ipcRenderer.invoke('SET_THEME', theme),
  showItemInFolder: (fullPath: string) =>
    ipcRenderer.invoke('SHOW_ITEM_IN_FOLDER', fullPath),
  openPath: (fullPath: string) => ipcRenderer.invoke('OPEN_PATH', fullPath),
  showOpenDialog: (options: Electron.OpenDialogOptions) =>
    ipcRenderer.invoke('OPEN_DIALOG', options),
  setMusicPaused: (paused: boolean) => ipcRenderer.invoke('SET_PAUSED', paused),
  setAppTitle: (title?: string) => ipcRenderer.invoke('SET_APP_TITLE', title),
})

function addListener(channel: string, callback: (...args: unknown[]) => void) {
  const listener = (_event: Electron.IpcRendererEvent, ...args: unknown[]) =>
    callback(...args)
  ipcRenderer.on(channel, listener)
  return () => ipcRenderer.off(channel, listener)
}

// main -> renderer
contextBridge.exposeInMainWorld('messageAPI', {
  onNavigate: (callback: (to: string) => void) =>
    addListener('NAVIGATE', callback),
  onUpdateDownload: (callback: (info: DownloadInfo) => void) =>
    addListener('UPDATE_DOWNLOAD', callback),
  onMusicControl: (
    callback: (type: 'prev' | 'play' | 'pause' | 'next') => void
  ) => addListener('MUSIC_CONTROL', callback),
})

contextBridge.exposeInMainWorld('argv', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  version,
  platform: process.platform,
  dev: process.argv.includes('--dev'),
})
