import { contextBridge, ipcRenderer } from 'electron'

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
  openAboutWindow: () => ipcRenderer.invoke('OPEN_ABOUT_WINDOW'),
  onMessage: (
    callback: (event: Electron.IpcRendererEvent, message: string) => void
  ) => ipcRenderer.on('MESSAGE', callback),
  sendMessageToMain: (message: string) =>
    ipcRenderer.invoke('SEND_TO_MAIN', 'MESSAGE', message),
})

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
})
