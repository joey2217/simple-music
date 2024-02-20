import { BrowserWindow, dialog, nativeTheme } from 'electron'
import * as path from 'node:path'
import type { OpenDialogOptions } from 'electron'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let win: BrowserWindow = null!

const DARK_BACK_COLOR = '#1d232a'

export function create() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
      symbolColor: '#641AE6',
      height: 40,
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      webSecurity: import.meta.env.PROD,
      sandbox: false,
    },
  })
  win.once('ready-to-show', () => {
    win.show()
    if (import.meta.env.DEV || process.argv.includes('--dev')) {
      win.webContents.openDevTools({ mode: 'bottom' })
    }
  })

  // win.on('close', (e) => {
  //   if (!quit) {
  //     e.preventDefault()
  //     win.hide()
  //   }
  // })

  if (import.meta.env.DEV) {
    win.loadURL('http://localhost:5174')
  } else {
    win.loadFile(path.join(__dirname, 'renderer/index.html'))
  }
}

export function focus() {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.show()
    win.focus()
  }
}

export function send(channel: string, ...args: unknown[]) {
  win.webContents.send(channel, ...args)
}

export function showOpenDialog(options: OpenDialogOptions) {
  return dialog.showOpenDialog(win, options)
}

export function setMainTitleBarOverlay(options: Electron.TitleBarOverlay) {
  if (win) {
    win.setTitleBarOverlay(options)
  }
}

export function mainNavigate(to: string) {
  send('NAVIGATE', to)
}
