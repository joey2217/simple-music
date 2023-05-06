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

const contextMenu = Menu.buildFromTemplate([
  { id: 'music', label: APP_NAME, icon: musicIcon, click: focus },
  { id: 'play', label: '播放', icon: playIcon, click: musicControl('play') },
  {
    id: 'pause',
    label: '暂停',
    icon: pauseIcon,
    click: musicControl('pause'),
    visible: false,
  },
  { label: '上一曲', icon: prevIcon, click: musicControl('prev') },
  { label: '下一曲', icon: nextIcon, click: musicControl('next') },
  { type: 'separator' },
  { label: '退出', icon: logoutIcon, role: 'quit' },
])

app.whenReady().then(() => {
  tray = new Tray(appIcon)
  // tray.setTitle('轻音乐')
  tray.setToolTip(APP_NAME)
  tray.setContextMenu(contextMenu)
  tray.on('click', focus)
})

export function setCurrentPlay(name: string) {
  const titleMenu = contextMenu.getMenuItemById('music')
  if (titleMenu) {
    titleMenu.label = name
    console.log(titleMenu.label, name, 'setCurrentPlay')
  }
}

export function onPlayingChange(playing: boolean) {
  const playMenu = contextMenu.getMenuItemById('play')
  const pauseMenu = contextMenu.getMenuItemById('pause')
  if (playing) {
    if (playMenu) {
      playMenu.visible = false
    }
    if (pauseMenu) {
      pauseMenu.visible = true
    }
  } else {
    if (playMenu) {
      playMenu.visible = true
    }
    if (pauseMenu) {
      pauseMenu.visible = false
    }
  }
  // tray.setContextMenu(contextMenu)
}
