import { app } from 'electron'
import { loadDevTools } from './dev'
import {
  beforeQuit,
  create as createMainWindow,
  focus as focusMainWindow,
} from './windows/main'
import handleIPC from './ipc'
import { checkUpdate } from './updater'
import './proxy'
import './menu'
import './tray'

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到Window这个窗口
    focusMainWindow()
  })
  app.whenReady().then(() => {
    createMainWindow()
    handleIPC()
    checkUpdate()
  })
}

if (import.meta.env.DEV) {
  loadDevTools()
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', beforeQuit)

// TODO mac 音乐控制