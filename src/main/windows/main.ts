import {
  BrowserWindow,
  dialog,
  nativeTheme,
  type OpenDialogOptions,
} from 'electron'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import log from 'electron-log'
import { nextIcon, pauseIcon, playIcon, prevIcon } from '../icons'
import type { Theme } from '../types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let win: BrowserWindow = null!

const DARK_BACK_COLOR = '#0c0a09'

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

export function setMainThumbarButtons(playing: boolean, disabled = false) {
  if (process.platform === 'win32' && win) {
    if (disabled) {
      const buttons = thumbarButtons.map((btn) => {
        btn.flags = ['disabled']
        return {
          ...btn,
          flags: ['disabled'],
        }
      })
      const bool = win.setThumbarButtons(buttons)
      log.info('SET_MAIN_THUMBAR_BUTTONS', bool)
    } else {
      if (playing) {
        const buttons = thumbarButtons.map((btn, index) => {
          return {
            ...btn,
            flags: index === 1 ? ['enabled', 'hidden'] : ['enabled'],
          }
        })
        const bool = win.setThumbarButtons(buttons)
        log.info('SET_MAIN_THUMBAR_BUTTONS', bool)
      } else {
        const buttons = thumbarButtons.map((btn, index) => {
          return {
            ...btn,
            flags: index === 2 ? ['enabled', 'hidden'] : ['enabled'],
          }
        })
        const bool = win.setThumbarButtons(buttons)
        log.info('SET_MAIN_THUMBAR_BUTTONS', bool)
      }
    }
  }
}
