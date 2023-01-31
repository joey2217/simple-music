import Electron from 'electron'

interface DownloadInfo {
  rid: number
  url: string
  fileName: string
}

interface IElectronAPI {
  download: (files: DownloadInfo[]) => Promise<void>
  setDownloadPath: (downloadPath: string) => Promise<void>
  getDownloadsPath: () => Promise<string>
  showItemInFolder: (fullPath: string) => Promise<void>
  openPath: (fullPath: string) => Promise<void>
}

interface IDevAPI {
  toggleDevtools: () => Promise<void>
}
interface IVersions {
  node: string
  chrome: string
  electron: string
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
