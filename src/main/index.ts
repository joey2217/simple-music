import { BrowserWindow, app } from 'electron'
import { loadDevTools } from './dev'
import {
  create as createMainWindow,
  focus as focusMainWindow,
} from './windows/main'
import handleIPC from './ipc'
import './proxy'

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    // 当运行第二个实例时,将会聚焦到Window这个窗口
    focusMainWindow()
  })
  app.whenReady().then(() => {
    createMainWindow()
    handleIPC()
  })
}

if (import.meta.env.DEV) {
  loadDevTools()
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  } else {
    focusMainWindow()
  }
})
