import { app, Menu, Tray } from 'electron'
import {
  appIcon,
  logoutIcon,
  prevIcon,
  playIcon,
  pauseIcon,
  nextIcon,
  musicIcon,
} from './icons'
import { focus, musicControl } from './windows/main'
import { APP_NAME } from './constant'

let tray: Tray

const MAX_TITLE_LENGTH = 10
const toolTip = APP_NAME

const contextMenu = Menu.buildFromTemplate([
  { id: 'music', label: APP_NAME, icon: musicIcon, click: focus },
  { type: 'separator' },
  {
    id: 'play',
    label: '播放',
    icon: playIcon,
    click: musicControl('play'),
    visible: false,
  },
  {
    id: 'pause',
    label: '暂停',
    icon: pauseIcon,
    click: musicControl('pause'),
    visible: false,
  },
  { label: '上一首', icon: prevIcon, click: musicControl('prev') },
  { label: '下一首', icon: nextIcon, click: musicControl('next') },
  { type: 'separator' },
  { label: '退出', icon: logoutIcon, role: 'quit' },
])

app.whenReady().then(() => {
  tray = new Tray(appIcon)
  tray.setToolTip(toolTip)
  tray.setContextMenu(contextMenu)
  tray.on('click', focus)
})

export function setTrayTitle(name?: string) {
  const playMenu = contextMenu.getMenuItemById('play')
  const pauseMenu = contextMenu.getMenuItemById('pause')
  const music = contextMenu.getMenuItemById('music')
  if (name) {
    if (playMenu && !playMenu.enabled) {
      playMenu.enabled = true
    }
    if (pauseMenu && !pauseMenu.enabled) {
      pauseMenu.enabled = true
    }
    tray.setToolTip(name)
    let title = name
    if (title.length > MAX_TITLE_LENGTH) {
      title = title.slice(0, MAX_TITLE_LENGTH) + '...'
    }
    if (music) {
      music.label = title
    }
  } else {
    if (playMenu && playMenu.enabled) {
      playMenu.enabled = false
    }
    if (pauseMenu && pauseMenu.enabled) {
      pauseMenu.enabled = false
    }
    if (music) {
      music.label = APP_NAME
    }
    tray.setToolTip(APP_NAME)
  }
}

export function setTrayPaused(paused: boolean) {
  const playMenu = contextMenu.getMenuItemById('play')
  const pauseMenu = contextMenu.getMenuItemById('pause')
  if (playMenu) {
    playMenu.visible = paused
  }
  if (pauseMenu) {
    pauseMenu.visible = !paused
  }
  // tray.setContextMenu(contextMenu)
}
