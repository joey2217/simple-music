import Electron from 'electron'

interface IElectronAPI {
  openAboutWindow: () => Promise<void>
  onMessage: (
    callback: (event: Electron.IpcRendererEvent, message: string) => void
  ) => Electron.IpcRenderer
  sendMessageToMain: (message: string) => Promise<void>
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
