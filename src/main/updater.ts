import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import { dialog } from 'electron'

autoUpdater.autoDownload = false

autoUpdater.on('error', (error) => {
  dialog.showErrorBox(
    '更新出错了',
    error == null ? 'unknown' : (error.stack || error).toString()
  )
})

autoUpdater.on('update-available', (info) => {
  dialog
    .showMessageBox({
      type: 'info',
      title: `检测到新版本 ${info.version}`,
      message: '是否马上更新!',
      buttons: ['是', '否'],
    })
    .then((res) => {
      if (res.response === 0) {
        autoUpdater.downloadUpdate()
      }
    })
})

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: '暂无更新',
    message: '当前版本已经是最新版本',
  })
})

autoUpdater.on('update-downloaded', () => {
  dialog
    .showMessageBox({
      type: 'info',
      title: '更新下载完成',
      message: '是否立刻更新并重启应用?',
      buttons: ['立刻更新', '下次重启更新'],
    })
    .then((res) => {
      if (res.response === 0) {
        setImmediate(() => autoUpdater.quitAndInstall())
      }
    })
})

export function checkForUpdates() {
  log.transports.file.level = 'debug'
  autoUpdater.logger = log
  autoUpdater.checkForUpdates()
}
