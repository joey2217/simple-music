import { BrowserWindow, nativeTheme } from 'electron'
import * as path from 'node:path'
import { nextIcon, pauseIcon, playIcon, prevIcon } from '../icons'
import { ROOT } from '../constant'

let win: BrowserWindow = null!
let quit = false

const DARK_BACK_COLOR = '#0c0a09'

const thumbarButtons: Electron.ThumbarButton[] = [
  {
    icon: prevIcon,
    click: musicControl('prev'),
    tooltip: '上一首',
    flags: ['disabled'],
  },
  {
    icon: playIcon,
    click: musicControl('play'),
    tooltip: '播放',
    flags: ['disabled'],
  },
  {
    icon: pauseIcon,
    click: musicControl('pause'),
    tooltip: '暂停',
    flags: ['disabled'],
  },
  {
    icon: nextIcon,
    click: musicControl('next'),
    tooltip: '下一首',
    flags: ['disabled'],
  },
]

export function create() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
      // symbolColor: nativeTheme.shouldUseDarkColors ? '#7480ff' : '#641AE6',
      // symbolColor: nativeTheme.shouldUseDarkColors ? '#cccccccc' : '#000000cc',
      symbolColor: '#4f46e5',
      height: 40,
    },
    webPreferences: {
      preload: path.join(ROOT, 'preload.mjs'),
      webSecurity: import.meta.env.PROD,
      sandbox: false,
    },
  })
  win.once('ready-to-show', () => {
    win.show()
    win.setThumbarButtons(thumbarButtons)
    if (import.meta.env.DEV || process.argv.includes('--dev')) {
      win.webContents.openDevTools({ mode: 'bottom' })
    }
  })

  win.on('close', (e) => {
    if (!quit) {
      e.preventDefault()
      win.hide()
    }
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
    win.show()
    win.focus()
  }
}

export function send(channel: string, ...args: unknown[]) {
  win.webContents.send(channel, ...args)
}

export function setMainTitleBarOverlay() {
  if (win) {
    win.setTitleBarOverlay({
      color: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
    })
  }
}

export function mainNavigate(to: string) {
  send('NAVIGATE', to)
}

export function musicControl(type: 'prev' | 'play' | 'pause' | 'next') {
  return () => win.webContents.send('MUSIC_CONTROL', type)
}

export function beforeQuit() {
  quit = true
}
