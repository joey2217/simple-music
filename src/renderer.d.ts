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
  setMusicPaused: (paused: boolean) => Promise<void>
  setAppTitle: (title?: string) => Promise<void>
}

type RemoveListener = () => void

interface MessageAPI {
  onNavigate: (callback: (to: string) => void) => RemoveListener
  onUpdateDownload: (callback: (info: DownloadInfo) => void) => RemoveListener
  onMusicControl: (
    callback: (type: 'prev' | 'play' | 'pause' | 'next') => void
  ) => RemoveListener
}

interface IDevAPI {
  toggleDevtools: () => Promise<void>
}

interface Argv {
  node: string
  chrome: string
  electron: string
  version: string
  dev: boolean
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
    argv: Argv
  }
}
