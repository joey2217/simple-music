import Electron from 'electron'

interface DownloadInfo {
  fileName: string
  downloadPath: string
  rid: string
  url: string
  title: string
  artist: string
  album: string
  lyric?: string
  cover?: string
}

interface IElectronAPI {
  download: (files: DownloadInfo[]) => Promise<void>
  getDownloadsPath: () => Promise<string>
  setMainTitleBarOverlay: (options: Electron.TitleBarOverlayOptions) => void
  checkUpdate: () => Promise<string>
  openExternal: (url: string) => Promise<void>
  onNavigate: (
    callback: (e: Electron.IpcRendererEvent, to: string) => void
  ) => void
  onDownloadFinish: (
    callback: (
      e: Electron.IpcRendererEvent,
      rid: number,
      success: boolean
    ) => void
  ) => void
  getArgv: (
    callback: (e: Electron.IpcRendererEvent, argv: string[]) => void
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
    devAPI: IDevAPI
    versions: IVersions
  }
}
