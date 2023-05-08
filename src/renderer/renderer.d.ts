import Electron from 'electron'
interface DownloadInfo {
  rid: number
  url: string
  fileName: string
}

interface IElectronAPI {
  download: (files: DownloadInfo[]) => Promise<void>
  getDownloadsPath: () => Promise<string>
  showItemInFolder: (fullPath: string) => Promise<void>
  openPath: (fullPath: string) => Promise<void>
  showOpenDialog: (
    options: Electron.OpenDialogOptions
  ) => Promise<Electron.OpenDialogReturnValue>
  setMainTitleBarOverlay: (options: Electron.TitleBarOverlayOptions) => void
  setMainThumbarButtons: (playing: boolean, disabled = false) => Promise<void>
  trashItem: (path: string) => Promise<void>
  setPlaying: (playing: boolean) => Promise<void>
  setCurrentPlay: (name: string) => Promise<void>
  checkUpdate: () => Promise<string>
  openExternal: (url: string) => Promise<void>
  onMusicControl: (
    callback: (
      e: Electron.IpcRendererEvent,
      type: 'prev' | 'play' | 'pause' | 'next'
    ) => void
  ) => void
  onDownloadFinish: (
    callback: (
      e: Electron.IpcRendererEvent,
      rid: number,
      success: boolean
    ) => void
  ) => void
  onNavigate: (
    callback: (e: Electron.IpcRendererEvent, to: string) => void
  ) => void
  onVersionUpdate: (
    callback: (
      e: IpcRendererEvent,
      info: string,
      status: 'normal' | 'error'
    ) => void
  ) => void
}

interface IDevAPI {
  toggleDevtools: () => Promise<void>
}
interface IVersions {
  node: string
  chrome: string
  electron: string
  version: string
  platform:
    | 'aix'
    | 'darwin'
    | 'freebsd'
    | 'linux'
    | 'openbsd'
    | 'sunos'
    | 'win32'
}

interface IKuwoAPI {
  onFetchToken: (
    callback: (event: Electron.IpcRendererEvent, csrf: string) => void
  ) => Electron.IpcRenderer
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
    devAPI: IDevAPI
    versions: IVersions
    kuwoAPI: IKuwoAPI
  }
}
