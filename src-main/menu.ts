import { Menu, app, Tray, dialog } from 'electron'
import { APP_NAME } from './constant'
import {
  appIcon,
  logoutIcon,
  prevIcon,
  playIcon,
  pauseIcon,
  nextIcon,
  musicIcon,
  icon,
} from './icons'
import { musicControl, focus } from './windows/main'
import { version } from '../package.json'

let musicPaused = true

function about() {
  dialog.showMessageBox({
    icon: icon,
    type: 'info',
    title: '关于' + APP_NAME,
    message: `${APP_NAME}\nv${version}\nnode: ${process.versions.node}\nchrome: ${process.versions.chrome}\nelectron: ${process.versions.electron}\nplatform: ${process.platform}\nv8: ${process.versions.v8}\n`,
  })
}

if (process.platform === 'darwin') {
  const menu = Menu.buildFromTemplate([
    {
      label: APP_NAME,
      submenu: [
        { label: '关于' + APP_NAME, click: about },
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

          click: musicControl('play'),
          enabled: false,
        },
        {
          label: '上一首',

          click: musicControl('prev'),
          enabled: false,
        },
        {
          label: '下一首',
          click: musicControl('next'),
          enabled: false,
        },
      ],
    },
  ])

  const dockMenu = Menu.buildFromTemplate([
    {
      id: 'dock-play',
      label: '播放',
      icon: playIcon,
      click: musicControl('play'),
      enabled: false,
    },
    {
      label: '上一首',
      icon: prevIcon,
      click: musicControl('prev'),
      enabled: false,
    },
    {
      label: '下一首',
      icon: nextIcon,
      click: musicControl('next'),
      enabled: false,
    },
  ])
  Menu.setApplicationMenu(menu)
  app.whenReady().then(() => {
    app.dock.setMenu(dockMenu)
  })
} else {
  Menu.setApplicationMenu(null)
}

/**
 * Tray
 */
let tray: Tray

const MAX_TITLE_LENGTH = 10

app.whenReady().then(() => {
  tray = new Tray(appIcon)
  tray.setToolTip(APP_NAME)
  const contextMenu = Menu.buildFromTemplate([
    { id: 'music', label: APP_NAME, icon: musicIcon, click: focus },
    { type: 'separator' },
    { label: '退出', icon: logoutIcon, role: 'quit' },
  ])
  tray.setContextMenu(contextMenu)
  tray.on('click', focus)
})

let title = APP_NAME

export function setMenuTitle(name?: string) {
  if (name) {
    tray.setToolTip(name)
    title = name
    if (title.length > MAX_TITLE_LENGTH) {
      title = title.slice(0, MAX_TITLE_LENGTH) + '...'
    }
    const contextMenu = Menu.buildFromTemplate([
      { id: 'music', label: title, icon: musicIcon, click: focus },
      { type: 'separator' },
      musicPaused
        ? {
            id: 'play',
            label: '播放',
            icon: playIcon,
            click: musicControl('play'),
          }
        : {
            id: 'pause',
            label: '暂停',
            icon: pauseIcon,
            click: musicControl('pause'),
          },
      { label: '上一首', icon: prevIcon, click: musicControl('prev') },
      { label: '下一首', icon: nextIcon, click: musicControl('next') },
      { type: 'separator' },
      { label: '退出', icon: logoutIcon, role: 'quit' },
    ])
    tray.setContextMenu(contextMenu)

    if (process.platform === 'darwin') {
      const menu = Menu.buildFromTemplate([
        {
          label: APP_NAME,
          submenu: [
            { label: '关于' + APP_NAME, click: about },
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
            musicPaused
              ? {
                  id: 'play',
                  label: '播放',

                  click: musicControl('play'),
                }
              : {
                  id: 'paused',
                  label: '暂停',
                  click: musicControl('pause'),
                },
            {
              label: '上一首',
              click: musicControl('prev'),
            },
            {
              label: '下一首',
              click: musicControl('next'),
            },
          ],
        },
      ])

      const dockMenu = Menu.buildFromTemplate([
        musicPaused
          ? {
              id: 'play',
              label: '播放',
              click: musicControl('play'),
            }
          : {
              id: 'paused',
              label: '暂停',
              click: musicControl('pause'),
            },
        {
          label: '上一首',
          click: musicControl('prev'),
        },
        {
          label: '下一首',
          click: musicControl('next'),
        },
      ])
      Menu.setApplicationMenu(menu)
      app.dock.setMenu(dockMenu)
    }
  } else {
    tray.setToolTip(APP_NAME)
    const contextMenu = Menu.buildFromTemplate([
      { id: 'music', label: APP_NAME, icon: musicIcon, click: focus },
      { type: 'separator' },
      { label: '退出', icon: logoutIcon, role: 'quit' },
    ])
    tray.setContextMenu(contextMenu)

    if (process.platform === 'darwin') {
      const menu = Menu.buildFromTemplate([
        {
          label: APP_NAME,
          submenu: [
            { label: '关于' + APP_NAME, click: about },
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
              enabled: false,
            },

            {
              label: '上一首',
              icon: prevIcon,
              click: musicControl('prev'),
              enabled: false,
            },
            {
              label: '下一首',
              icon: nextIcon,
              click: musicControl('next'),
              enabled: false,
            },
          ],
        },
      ])

      const dockMenu = Menu.buildFromTemplate([
        {
          id: 'play',
          label: '播放',
          icon: playIcon,
          click: musicControl('play'),
          enabled: false,
        },
        {
          label: '上一首',
          icon: prevIcon,
          click: musicControl('prev'),
          enabled: false,
        },
        {
          label: '下一首',
          icon: nextIcon,
          click: musicControl('next'),
          enabled: false,
        },
      ])
      Menu.setApplicationMenu(menu)
      app.dock.setMenu(dockMenu)
    }
  }
}

export function setMenuPaused(paused: boolean) {
  musicPaused = paused
  const contextMenu = Menu.buildFromTemplate([
    { id: 'music', label: title, icon: musicIcon, click: focus },
    { type: 'separator' },
    paused
      ? {
          id: 'play',
          label: '播放',
          icon: playIcon,
          click: musicControl('play'),
        }
      : {
          id: 'pause',
          label: '暂停',
          icon: pauseIcon,
          click: musicControl('pause'),
        },
    { label: '上一首', icon: prevIcon, click: musicControl('prev') },
    { label: '下一首', icon: nextIcon, click: musicControl('next') },
    { type: 'separator' },
    { label: '退出', icon: logoutIcon, role: 'quit' },
  ])
  tray.setContextMenu(contextMenu)

  if (process.platform === 'darwin') {
    const menu = Menu.buildFromTemplate([
      {
        label: APP_NAME,
        submenu: [
          { label: '关于' + APP_NAME, click: about },
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
          musicPaused
            ? {
                id: 'play',
                label: '播放',
                icon: playIcon,
                click: musicControl('play'),
              }
            : {
                id: 'paused',
                label: '暂停',
                icon: pauseIcon,
                click: musicControl('pause'),
              },
          {
            label: '上一首',
            icon: prevIcon,
            click: musicControl('prev'),
          },
          {
            label: '下一首',
            icon: nextIcon,
            click: musicControl('next'),
          },
        ],
      },
    ])

    const dockMenu = Menu.buildFromTemplate([
      musicPaused
        ? {
            id: 'play',
            label: '播放',
            icon: playIcon,
            click: musicControl('play'),
          }
        : {
            id: 'paused',
            label: '暂停',
            icon: pauseIcon,
            click: musicControl('pause'),
          },
      {
        label: '上一首',
        icon: prevIcon,
        click: musicControl('prev'),
      },
      {
        label: '下一首',
        icon: nextIcon,
        click: musicControl('next'),
      },
    ])
    Menu.setApplicationMenu(menu)
    app.dock.setMenu(dockMenu)
  }
}
