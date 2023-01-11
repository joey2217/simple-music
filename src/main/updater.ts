import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

export function checkUpdate() {
  log.transports.file.level = 'debug'
  autoUpdater.logger = log
  autoUpdater.checkForUpdatesAndNotify()
}
