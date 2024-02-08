import { ipcMain, nativeTheme, shell } from 'electron'
import { send as sendToMain, setMainTitleBarOverlay } from './windows/main'
import { checkForUpdates } from './updater'

export default function handleIPC() {
  nativeTheme.themeSource = 'system'

  ipcMain.handle('TOGGLE_DEVTOOLS', (event) => {
    event.sender.toggleDevTools()
  })

  ipcMain.handle('SEND_TO_MAIN', (e, channel: string, ...args: any[]) => {
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
}
