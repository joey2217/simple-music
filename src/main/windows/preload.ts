import { contextBridge, ipcRenderer } from 'electron'
import { version } from '../../../package.json'
import type { DownloadInfo } from '../types'
import type { OpenDialogOptions, IpcRendererEvent } from 'electron'

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
  setDownloadPath: (downloadPath: string) =>
    ipcRenderer.invoke('SET_DOWNLOAD_PATH', downloadPath),
  getDownloadsPath: () => ipcRenderer.invoke('GET_DOWNLOADS_PATH'),
  showItemInFolder: (fullPath: string) =>
    ipcRenderer.invoke('SHOW_ITEM_IN_FOLDER', fullPath),
  openPath: (fullPath: string) => ipcRenderer.invoke('OPEN_PATH', fullPath),
  showOpenDialog: (options: OpenDialogOptions) =>
    ipcRenderer.invoke('OPEN_DIALOG', options),
  setMainTitleBarOverlay: (options: Electron.TitleBarOverlayOptions) =>
    ipcRenderer.invoke('SET_MAIN_TITLE_BAR_OVERLAY', options),
  setMainThumbarButtons: (playing: boolean, disabled = false) =>
    ipcRenderer.invoke('SET_MAIN_THUMBAR_BUTTONS', playing, disabled),
  trashItem: (path: string) => ipcRenderer.invoke('TRASH_ITEM', path),
  onMusicControl: (
    callback: (
      e: IpcRendererEvent,
      type: 'prev' | 'play' | 'pause' | 'next'
    ) => void
  ) => ipcRenderer.on('MUSIC_CONTROL', callback),
  onDownloadFinish: (
    callback: (e: IpcRendererEvent, rid: number, success: boolean) => void
  ) => ipcRenderer.on('DOWNLOAD_FINISHED', callback),
})

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  version,
  platform: process.platform,
})
