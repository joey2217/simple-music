import { Menu } from 'electron'
import type { MenuItemConstructorOptions } from 'electron'
import { APP_NAME } from './constant'
import { nextIcon, pauseIcon, playIcon, prevIcon } from './icons'
import { musicControl } from './windows/main'

let menu: Menu

if (process.platform === 'darwin') {
  const template: MenuItemConstructorOptions[] = [
    // { role: 'appMenu' }
    {
      label: APP_NAME,
      submenu: [
        { role: 'about', label: '关于' },
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
    // { role: 'fileMenu' }
    // {
    //   label: 'File',
    //   submenu: [{ role: 'close' }],
    // },
    // { role: 'editMenu' }
    // {
    //   label: 'Edit',
    //   submenu: [
    //     { role: 'undo' },
    //     { role: 'redo' },
    //     { type: 'separator' },
    //     { role: 'cut' },
    //     { role: 'copy' },
    //     { role: 'paste' },

    //     { role: 'pasteAndMatchStyle' },
    //     { role: 'delete' },
    //     { role: 'selectAll' },
    //     { type: 'separator' },
    //     {
    //       label: 'Speech',
    //       submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
    //     },
    //   ],
    // },
    // { role: 'viewMenu' }
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
    // { role: 'windowMenu' }
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
        { label: '上一曲', icon: prevIcon, click: musicControl('prev') },
        { label: '下一曲', icon: nextIcon, click: musicControl('next') },
      ],
    },
    // {
    //   role: 'help',
    //   submenu: [
    //     {
    //       label: 'Learn More',
    //       click: async () => {
    //         const { shell } = require('electron')
    //         await shell.openExternal('https://electronjs.org')
    //       },
    //     },
    //   ],
    // },
  ]
  menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
} else {
  Menu.setApplicationMenu(null)
}

export function onMenuPlayingChange(playing: boolean) {
  if (menu) {
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
  // tray.setContextMenu(contextMenu)
}
