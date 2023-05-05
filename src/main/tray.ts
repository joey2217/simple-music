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

let tray: Tray

const contextMenu = Menu.buildFromTemplate([
  { id: 'app', label: '轻音乐', icon: musicIcon, click: focus },
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
  { label: '退出', role: 'quit', icon: logoutIcon },
])

app.whenReady().then(() => {
  tray = new Tray(appIcon)
  tray.setTitle('轻音乐')
  tray.setContextMenu(contextMenu)
  tray.on('click', focus)
})
