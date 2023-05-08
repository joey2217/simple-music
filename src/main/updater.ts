import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

export function checkUpdate() {
  log.transports.file.level = 'debug'
  autoUpdater.logger = log
  return autoUpdater.checkForUpdatesAndNotify({
    title: '检测到新版本',
    body: `{appName}新版本{version}已经下载完成,重启后更新.`,
  })
}
