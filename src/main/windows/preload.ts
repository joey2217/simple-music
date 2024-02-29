import { contextBridge, ipcRenderer } from 'electron'
import { version } from '../../../package.json'
import type { DownloadInfo, Theme } from '../types'
/**
 * 不能加载常量,sandbox无法加载
 */
contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
})

contextBridge.exposeInMainWorld('devAPI', {
  toggleDevtools: () => ipcRenderer.invoke('TOGGLE_DEVTOOLS'),
})

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
  onNavigate: (callback: (e: Electron.IpcRendererEvent, to: string) => void) =>
    ipcRenderer.on('NAVIGATE', callback),
  onUpdateDownload: (
    callback: (e: Electron.IpcRendererEvent, info: DownloadInfo) => void
  ) => ipcRenderer.on('UPDATE_DOWNLOAD', callback),
})

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  version,
  platform: process.platform,
})
