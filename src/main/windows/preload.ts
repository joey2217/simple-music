import { contextBridge, ipcRenderer } from 'electron'
import { version } from '../../../package.json'
import type { DownloadInfo, Theme } from '../types'
/**
 * 不能加载常量,sandbox无法加载
 */
contextBridge.exposeInMainWorld('devAPI', {
  toggleDevtools: () => ipcRenderer.invoke('TOGGLE_DEVTOOLS'),
})

// renderer -> main
contextBridge.exposeInMainWorld('electronAPI', {
  download: (files: DownloadInfo[]) =>
    ipcRenderer.invoke('DOWNLOAD_FILES', files),
  getDownloadsPath: () => ipcRenderer.invoke('GET_DOWNLOADS_PATH'),
  checkUpdate: () => ipcRenderer.invoke('CHECK_FOR_UPDATE'),
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

// main -> renderer
contextBridge.exposeInMainWorld('messageAPI', {
  onNavigate: (callback: (e: Electron.IpcRendererEvent, to: string) => void) =>
    ipcRenderer.on('NAVIGATE', callback),
  onUpdateDownload: (
    callback: (e: Electron.IpcRendererEvent, info: DownloadInfo) => void
  ) => ipcRenderer.on('UPDATE_DOWNLOAD', callback),
  onMusicControl: (
    callback: (
      e: Electron.IpcRendererEvent,
      type: 'prev' | 'play' | 'pause' | 'next'
    ) => void
  ) => ipcRenderer.on('MUSIC_CONTROL', callback),
})

contextBridge.exposeInMainWorld('argv', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  version,
  platform: process.platform,
  dev: process.argv.includes('--dev'),
})
