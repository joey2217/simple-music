import { ipcMain } from 'electron'
import { download } from './download'
import { send as sendToMain } from './windows/main'
import type { DownloadInfo } from './types'

export default function handleIPC() {
  ipcMain.handle('TOGGLE_DEVTOOLS', (event) => {
    event.sender.toggleDevTools()
  })

  ipcMain.handle('SEND_TO_MAIN', (e, channel: string, ...args: any[]) => {
    sendToMain(channel, ...args)
  })

  ipcMain.handle('DOWNLOAD_FILES', (e, files: DownloadInfo[]) => {
    download(files)
  })
}
