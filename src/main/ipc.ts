import { app, ipcMain, nativeTheme, shell } from 'electron'
import { send as sendToMain, setMainTitleBarOverlay } from './windows/main'
import { checkForUpdates } from './updater'
import type { DownloadInfo } from './types'
import { download } from './download'

export default function handleIPC() {
  nativeTheme.themeSource = 'dark'

  ipcMain.handle('TOGGLE_DEVTOOLS', (event) => {
    event.sender.toggleDevTools()
  })

  ipcMain.handle('SEND_TO_MAIN', (e, channel: string, ...args: unknown[]) => {
    sendToMain(channel, ...args)
  })

  ipcMain.handle('CHECK_FOR_UPDATE', () => {
    return checkForUpdates().then((res) => (res ? res.updateInfo.version : ''))
  })

  ipcMain.handle(
    'SET_MAIN_TITLE_BAR_OVERLAY',
    (e, options: Electron.TitleBarOverlay) => {
      if (process.platform === 'win32') {
        setMainTitleBarOverlay(options)
      }
    }
  )
  ipcMain.handle('OPEN_EXTERNAL', (_e, url: string) => {
    return shell.openExternal(url)
  })

  ipcMain.handle('DOWNLOAD_FILES', (e, files: DownloadInfo[]) => {
    download(files)
  })

  ipcMain.handle('GET_DOWNLOADS_PATH', () => {
    return app.getPath('downloads')
  })
}
