import { app, session } from 'electron'
import * as path from 'path'
import type { DownloadItem } from 'electron'
import type { DownloadInfo } from './types'

let downloadPath = app.getPath('downloads')

let downloadItem: DownloadItem | null = null
let downloadFile: DownloadInfo | null = null
const downloadFiles: DownloadInfo[] = []

export function setDownloadPath(dPath) {
  downloadPath = dPath
}

export function download(items: DownloadInfo[]) {
  if (items.length > 0) {
    const downloadFileIds = downloadFiles.map((f) => f.rid)
    const downloadItems = items.filter((f) => !downloadFileIds.includes(f.rid))
    downloadFiles.push(...downloadItems)
    if (downloadFile == null) {
      downloadFile = downloadFiles.shift()
      if (downloadFile) {
        session.defaultSession.downloadURL(downloadFile.url)
      }
    }
  }
}

// https://www.electronjs.org/zh/docs/latest/api/download-item
app.whenReady().then(() => {
  session.defaultSession.on('will-download', (event, item, webContents) => {
    downloadItem = item
    item.setSavePath(path.join(downloadPath, downloadFile.fileName))

    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}`)
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Download successfully')
        onCompleted()
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  })
})

function onCompleted() {
  if (downloadFiles.length > 0) {
    downloadFile = downloadFiles.shift()
    downloadItem = null
  } else {
    downloadItem = null
    downloadFile = null
  }
}
