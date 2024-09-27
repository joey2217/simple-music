import { BrowserWindow, nativeTheme } from 'electron'
import * as path from 'node:path'
import { nextIcon, pauseIcon, playIcon, prevIcon } from '../icons'
import { DEV, ROOT } from '../constant'

let win: BrowserWindow = null!
let quit = false
let musicPaused = true

const DARK_BACK_COLOR = '#0c0a09'

export function create() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    titleBarStyle: 'hidden',
    backgroundColor: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
    titleBarOverlay: {
      color: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
      symbolColor: '#22c55e',
      height: 40,
    },
    webPreferences: {
      devTools: DEV,
      preload: path.join(ROOT, 'preload.cjs'),
      webSecurity: import.meta.env.PROD,
    },
  })
  win.once('ready-to-show', () => {
    win.show()
    if (process.platform === 'win32') {
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
          icon: nextIcon,
          click: musicControl('next'),
          tooltip: '下一首',
          flags: ['disabled'],
        },
      ]
      win.setThumbarButtons(thumbarButtons)
    }
    if (DEV) {
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
    win.loadFile(path.join(ROOT, 'renderer/index.html'))
  }
}

export function focus() {
  if (win) {
    if (win.isMinimized()) {
      win.restore()
    }
    win.show()
    win.focus()
    setThumbarButtonsPaused(musicPaused)
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

export function setThumbarButtonsEnabled(enabled: boolean) {
  if (process.platform === 'win32') {
    if (enabled) {
      const thumbarButtons: Electron.ThumbarButton[] = [
        {
          icon: prevIcon,
          click: musicControl('prev'),
          tooltip: '上一首',
          flags: enabled ? undefined : ['disabled'],
        },
        {
          icon: pauseIcon,
          click: musicControl('pause'),
          tooltip: '暂停',
          flags: enabled ? undefined : ['disabled'],
        },
        {
          icon: nextIcon,
          click: musicControl('next'),
          tooltip: '下一首',
          flags: enabled ? undefined : ['disabled'],
        },
      ]
      win.setThumbarButtons(thumbarButtons)
    } else {
      win.setThumbarButtons([])
    }
  }
}

export function setThumbarButtonsPaused(paused: boolean) {
  musicPaused = paused
  if (process.platform === 'win32') {
    const thumbarButtons: Electron.ThumbarButton[] = [
      {
        icon: prevIcon,
        click: musicControl('prev'),
        tooltip: '上一首',
      },
      paused
        ? {
            icon: playIcon,
            click: musicControl('play'),
            tooltip: '播放',
          }
        : {
            icon: pauseIcon,
            click: musicControl('pause'),
            tooltip: '暂停',
          },
      {
        icon: nextIcon,
        click: musicControl('next'),
        tooltip: '下一首',
      },
    ]
    win.setThumbarButtons(thumbarButtons)
  }
}
