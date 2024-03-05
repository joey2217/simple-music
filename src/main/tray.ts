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

function musicPlay(type: 'play' | 'pause') {
  const playMenu = contextMenu.getMenuItemById('play')
  const pauseMenu = contextMenu.getMenuItemById('pause')
  if (playMenu) {
    playMenu.visible = type === 'play'
  }
  if (pauseMenu) {
    pauseMenu.visible = type === 'pause'
  }
  musicControl(type)
  // tray.setContextMenu(contextMenu)
}

const contextMenu = Menu.buildFromTemplate([
  { id: 'music', label: APP_NAME, icon: musicIcon, click: focus },
  { type: 'separator' },
  { id: 'play', label: '播放', icon: playIcon, click: () => musicPlay('play') },
  {
    id: 'pause',
    label: '暂停',
    icon: pauseIcon,
    click: () => musicPlay('pause'),
    visible: false,
  },
  { label: '上一首', icon: prevIcon, click: musicControl('prev') },
  { label: '下一首', icon: nextIcon, click: musicControl('next') },
  { type: 'separator' },
  { label: '退出', icon: logoutIcon, role: 'quit' },
])

app.whenReady().then(() => {
  tray = new Tray(appIcon)
  // tray.setTitle('轻音乐')
  tray.setToolTip(toolTip)
  tray.setContextMenu(contextMenu)
  tray.on('click', focus)
})

export function setCurrentPlay(name: string) {
  // const titleMenu = contextMenu.getMenuItemById('music')
  // if (titleMenu) {
  //   titleMenu.label = name
  // }
  if (tray) {
    tray.setToolTip(name)
  }
  let title = name
  if (title.length > MAX_TITLE_LENGTH) {
    title = title.slice(0, MAX_TITLE_LENGTH) + '...'
  }
  contextMenu.items[0].label = title
}
