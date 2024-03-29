import { app, ipcMain, nativeTheme, shell, dialog } from 'electron'
import {
  setMainTitleBarOverlay,
  setThumbarButtonsEnabled,
  setThumbarButtonsPaused,
} from './windows/main'
import { checkForUpdates } from './updater'
import type { DownloadInfo, Theme } from './types'
import { download } from './download'
import { setMenuPaused, setMenuTitle } from './menu'

export default function handleIPC() {
  ipcMain.handle('TOGGLE_DEVTOOLS', (event) => {
    event.sender.toggleDevTools()
  })

  ipcMain.handle('CHECK_FOR_UPDATE', () => {
    return checkForUpdates().then((res) => (res ? res.updateInfo.version : ''))
  })

  ipcMain.handle('SET_THEME', (e, theme: Theme) => {
    nativeTheme.themeSource = theme
    if (process.platform === 'win32') {
      setMainTitleBarOverlay()
    }
  })

  ipcMain.handle('OPEN_EXTERNAL', (_e, url: string) => {
    return shell.openExternal(url)
  })

  ipcMain.handle('DOWNLOAD_FILES', (e, files: DownloadInfo[]) => {
    download(files)
  })

  ipcMain.handle('GET_DOWNLOADS_PATH', () => {
    return app.getPath('downloads')
  })

  ipcMain.handle('SHOW_ITEM_IN_FOLDER', (e, fullPath: string) => {
    shell.showItemInFolder(fullPath)
  })

  ipcMain.handle('OPEN_PATH', (e, fullPath: string) => {
    return shell.openPath(fullPath)
  })

  ipcMain.handle('OPEN_DIALOG', (e, options: Electron.OpenDialogOptions) => {
    return dialog.showOpenDialog(options)
  })

  ipcMain.handle('SET_PAUSED', (_e, paused: boolean) => {
    setMenuPaused(paused)
    if (process.platform === 'win32') {
      setThumbarButtonsPaused(paused)
    }
    // console.log('SET_PAUSED', paused)
  })

  ipcMain.handle('SET_APP_TITLE', (_e, title?: string) => {
    setMenuTitle(title)
    if (process.platform === 'win32') {
      setThumbarButtonsEnabled(Boolean(title))
    }
    // console.log('SET_APP_TITLE', title)
  })
}
