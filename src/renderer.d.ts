import Electron from 'electron'

type DownloadStatus = 'init' | 'downloading' | 'completed' | 'failed'

interface DownloadInfo {
  fileName: string
  downloadPath: string
  rid: string
  url: string
  title: string
  artist: string
  album: string
  status: DownloadStatus
  lyric?: string
  cover?: string
}

interface IElectronAPI {
  download: (files: DownloadInfo[]) => Promise<void>
  getDownloadsPath: () => Promise<string>
  checkUpdate: () => Promise<string>
  openExternal: (url: string) => Promise<void>
  setTheme: (theme: Theme) => Promise<void>
  showItemInFolder: (fullPath: string) => Promise<void>
  openPath: (fullPath: string) => Promise<string>
  showOpenDialog: (
    options: Electron.OpenDialogOptions
  ) => Promise<Electron.OpenDialogReturnValue>
}

interface MessageAPI {
  onNavigate: (
    callback: (e: Electron.IpcRendererEvent, to: string) => void
  ) => void
  onUpdateDownload: (
    callback: (e: Electron.IpcRendererEvent, info: DownloadInfo) => void
  ) => void
  onMusicControl: (
    callback: (
      e: Electron.IpcRendererEvent,
      type: 'prev' | 'play' | 'pause' | 'next'
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

declare global {
  interface Window {
    electronAPI: IElectronAPI
    messageAPI: MessageAPI
    devAPI: IDevAPI
    versions: IVersions
  }
}
