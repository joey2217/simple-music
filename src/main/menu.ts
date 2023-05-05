import { app, Menu } from 'electron'
import type { MenuItemConstructorOptions } from 'electron'

if (process.platform === 'darwin') {
  const appName = app.name
  const template: MenuItemConstructorOptions[] = [
    // { role: 'appMenu' }
    {
      label: appName,
      submenu: [
        { role: 'about', label: '关于' },
        { type: 'separator' },
        { role: 'services', label: '服务' },
        { type: 'separator' },
        { role: 'hide', label: '隐藏' },
        { role: 'hideOthers', label: '隐藏其他' },
        { role: 'unhide', label: '全部显示' },
        { type: 'separator' },
        { label: '退出 ' + appName, role: 'quit' },
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

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
} else {
  Menu.setApplicationMenu(null)
}
