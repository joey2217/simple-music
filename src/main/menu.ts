import { Menu, app } from 'electron'
import type { MenuItemConstructorOptions } from 'electron'
import { APP_NAME } from './constant'
import { nextIcon, pauseIcon, playIcon, prevIcon } from './icons'
import { mainNavigate, musicControl } from './windows/main'

const template: MenuItemConstructorOptions[] = [
  {
    label: APP_NAME,
    submenu: [
      { label: '关于', click: () => mainNavigate('/setting/about') },
      { type: 'separator' },
      { role: 'services', label: '服务' },
      { type: 'separator' },
      { role: 'hide', label: '隐藏' },
      { role: 'hideOthers', label: '隐藏其他' },
      { role: 'unhide', label: '全部显示' },
      { type: 'separator' },
      { label: '退出 ' + APP_NAME, role: 'quit' },
    ],
  },
  {
    label: '查看',
    submenu: [
      { role: 'reload', label: '刷新' },
      { role: 'forceReload', label: '强制刷新' },
      { role: 'toggleDevTools', label: '切换开发者工具' },
      { type: 'separator' },
      { role: 'resetZoom', label: '重置缩放' },
      { role: 'zoomIn', label: '缩小' },
      { role: 'zoomOut', label: '放大' },
      { type: 'separator' },
      { role: 'togglefullscreen', label: '切换全屏' },
    ],
  },
  {
    label: '窗口',
    submenu: [
      { role: 'minimize', label: '最小化' },
      { role: 'zoom', label: '缩放' },
      { type: 'separator' },
      { role: 'front', label: '置顶' },
      { role: 'togglefullscreen', label: '切换全屏' },
    ],
  },
  {
    label: '控制',
    submenu: [
      {
        id: 'play',
        label: '播放',
        icon: playIcon,
        click: musicControl('play'),
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
    ],
  },
]
const menu = Menu.buildFromTemplate(template)

const dockMenu = Menu.buildFromTemplate([
  {
    id: 'dock-play',
    label: '播放/暂停',
    icon: playIcon,
    click: musicControl('play'),
  },
  // {
  //   id: 'dock-pause',
  //   label: '暂停',
  //   icon: pauseIcon,
  //   click: musicControl('pause'),
  //   visible: false,
  // },
  { label: '上一首', icon: prevIcon, click: musicControl('prev') },
  { label: '下一首', icon: nextIcon, click: musicControl('next') },
])

if (process.platform === 'darwin') {
  Menu.setApplicationMenu(menu)
  app.whenReady().then(() => {
    app.dock.setMenu(dockMenu)
  })
} else {
  Menu.setApplicationMenu(null)
}

export function onMenuPlayingChange(playing: boolean) {
  if (process.platform === 'darwin') {
    const playMenu = menu.getMenuItemById('play')
    const pauseMenu = menu.getMenuItemById('pause')
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
  }
  // FIXME dock menu visible
  // if (process.platform === 'darwin') {
  //   const playMenu = dockMenu.getMenuItemById('dock-play')
  //   const pauseMenu = dockMenu.getMenuItemById('dock-pause')
  //   if (playing) {
  //     if (playMenu) {
  //       playMenu.visible = false
  //     }
  //     if (pauseMenu) {
  //       pauseMenu.visible = true
  //     }
  //   } else {
  //     if (playMenu) {
  //       playMenu.visible = true
  //     }
  //     if (pauseMenu) {
  //       pauseMenu.visible = false
  //     }
  //   }
  // }
  // tray.setContextMenu(contextMenu)
}
