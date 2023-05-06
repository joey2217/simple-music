import { BrowserWindow, dialog } from 'electron'
import * as path from 'path'
import type { OpenDialogOptions } from 'electron'
import { nextIcon, pauseIcon, playIcon, prevIcon } from '../icons'

let win: BrowserWindow = null!

let quit = false

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
      color: '#fff',
      symbolColor: '#4f46e5',
      height: 40,
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: import.meta.env.PROD,
    },
  })
  win.once('ready-to-show', () => {
    win.show()
    win.webContents.openDevTools({ mode: 'bottom' })
  })

  win.on('close', (e) => {
    if (!quit) {
      e.preventDefault()
      win.hide()
    }
  })

  if (process.platform === 'win32') {
    const bool = win.setThumbarButtons(thumbarButtons)
    console.log('create', bool)
  }
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

export function send(channel: string, ...args: any[]) {
  win.webContents.send(channel, ...args)
}

export function showOpenDialog(options: OpenDialogOptions) {
  return dialog.showOpenDialog(win, options)
}

export function setMainTitleBarOverlay(
  options: Electron.TitleBarOverlayOptions
) {
  if (win) {
    win.setTitleBarOverlay(options)
  }
}

export function musicControl(type: 'prev' | 'play' | 'pause' | 'next') {
  return () => win.webContents.send('MUSIC_CONTROL', type)
}

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
      console.log('SET_MAIN_THUMBAR_BUTTONS', bool)
    } else {
      if (playing) {
        const buttons = thumbarButtons.map((btn, index) => {
          return {
            ...btn,
            flags: index === 1 ? ['enabled', 'hidden'] : ['enabled'],
          }
        })
        const bool = win.setThumbarButtons(buttons)
        console.log('SET_MAIN_THUMBAR_BUTTONS', bool)
      } else {
        const buttons = thumbarButtons.map((btn, index) => {
          return {
            ...btn,
            flags: index === 2 ? ['enabled', 'hidden'] : ['enabled'],
          }
        })
        const bool = win.setThumbarButtons(buttons)
        console.log('SET_MAIN_THUMBAR_BUTTONS', bool)
      }
    }
  }
}

export function beforeQuit() {
  quit = true
}
