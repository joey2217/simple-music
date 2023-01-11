import { ipcMain } from 'electron'
import { send as sendToMain } from './windows/main'

export default function handleIPC() {
  ipcMain.handle('TOGGLE_DEVTOOLS', (event) => {
    event.sender.toggleDevTools()
  })

  ipcMain.handle('SEND_TO_MAIN', (e, channel: string, ...args: any[]) => {
    sendToMain(channel, ...args)
  })
}
