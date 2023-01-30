import { BrowserWindow } from 'electron'
import * as path from 'path'

let win: BrowserWindow = null!

export function create() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: import.meta.env.PROD,
    },
  })
  win.on('ready-to-show', () => {
    win.show()
    win.webContents.openDevTools()
  })
  if (import.meta.env.DEV) {
    win.loadURL('http://localhost:5174')
  } else {
    win.loadFile(path.join(__dirname, 'renderer/index.html'))
  }
}

export function focus() {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
}

export function send(channel: string, ...args: any[]) {
  win.webContents.send(channel, ...args)
}
