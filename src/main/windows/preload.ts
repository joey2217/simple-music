import { contextBridge, ipcRenderer } from 'electron'
import { version } from '../../../package.json'
import type { DownloadInfo } from '../types'
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
  setMainTitleBarOverlay: (options: Electron.TitleBarOverlay) =>
    ipcRenderer.invoke('SET_MAIN_TITLE_BAR_OVERLAY', options),
  checkUpdate: () => ipcRenderer.invoke('CHECK_FOR_UPDATE'),
  openExternal: (url: string) => ipcRenderer.invoke('OPEN_EXTERNAL', url),
  onNavigate: (callback: (e: Electron.IpcRendererEvent, to: string) => void) =>
    ipcRenderer.on('NAVIGATE', callback),
  onDownloadFinish: (
    callback: (
      e: Electron.IpcRendererEvent,
      rid: number,
      success: boolean
    ) => void
  ) => ipcRenderer.on('DOWNLOAD_FINISHED', callback),
  // getArgv: (callback: (e: Electron.IpcRendererEvent, argv: string[]) => void) =>
  //   ipcRenderer.on('ARGV', callback),
})

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  version,
  platform: process.platform,
})
