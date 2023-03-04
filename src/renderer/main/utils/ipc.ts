export function toggleDevtools() {
  window.devAPI.toggleDevtools()
}

export function setDownloadPath(downloadPath: string) {
  window.electronAPI.setDownloadPath(downloadPath)
}

export function getDownloadsPath() {
  return window.electronAPI.getDownloadsPath()
}

export function showItemInFolder(fullPath: string) {
  return window.electronAPI.showItemInFolder(fullPath)
}

export function openPath(fullPath: string) {
  return window.electronAPI.openPath(fullPath)
}

export function showOpenDialog(options: Electron.OpenDialogOptions) {
  return window.electronAPI.showOpenDialog(options)
}
