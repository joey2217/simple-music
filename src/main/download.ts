import { app, session, Notification } from 'electron'
import log from 'electron-log'
import * as path from 'path'
import type { DownloadInfo } from './types'
import { mainNavigate, send as sendMain } from './windows/main'
import { Promise as NodeID3Promise } from 'node-id3'

// import { downloadIcon } from './icons'

let downloadFile: DownloadInfo | null = null
const downloadFiles: DownloadInfo[] = []

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
  session.defaultSession.on('will-download', (event, item) => {
    downloadFile.downloadPath = path.normalize(downloadFile.downloadPath)
    item.setSavePath(downloadFile.downloadPath)
    // item.setSavePath(
    //   path.join(
    //     app.getPath('downloads'),
    //     downloadFile.fileName || 'download.mp3'
    //   )
    // )

    // item.on('updated', (event, state) => {
    //   if (state === 'interrupted') {
    //     log.info('Download is interrupted but can be resumed')
    //   } else if (state === 'progressing') {
    //     if (item.isPaused()) {
    //       log.info('Download is paused')
    //     } else {
    //       log.info(`Received bytes: ${item.getReceivedBytes()}`)
    //     }
    //   }
    // })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        log.info('Download successfully', downloadFile.downloadPath)
        onCompleted(true)
      } else {
        log.info(`Download failed: ${state}`)
        onCompleted(false)
      }
    })
  })
})

let notification: Notification

function fetchCoverBuffer(imgUrl: string): Promise<ArrayBuffer | undefined> {
  let url = ''
  if (imgUrl.startsWith('//')) {
    url = 'https:' + imgUrl
  } else {
    url = imgUrl
  }
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .catch((error) => {
      log.error('fetchCoverBuffer error', error, imgUrl)
      return undefined
    })
}

function onCompleted(success: boolean) {
  if (downloadFile) {
    sendMain('DOWNLOAD_FINISHED', downloadFile.rid, success)
    notification = new Notification({
      title: `${downloadFile.fileName}下载成功!`,
      // icon: downloadIcon,
    })
    notification.on('click', () => {
      mainNavigate('/download')
    })
    notification.show()
    if (success) {
      console.log(downloadFile)
      fetchCoverBuffer(downloadFile.cover).then((buffer) => {
        NodeID3Promise.write(
          {
            title: downloadFile.title,
            artist: downloadFile.artist,
            album: downloadFile.album,
            image: buffer
              ? {
                  mime: downloadFile.cover.endsWith('.webp')
                    ? 'image/webp'
                    : 'image/jpeg',
                  type: {
                    id: 3,
                    name: 'front cover',
                  },
                  description: 'cover',
                  imageBuffer: Buffer.from(buffer),
                }
              : undefined,
          },
          downloadFile.downloadPath
        )
          .then((bool) => {
            log.info('歌曲标签写入成功', bool)
          })
          .catch((error) => {
            log.info('歌曲标签写入失败', error)
          })
          .finally(() => {
            if (downloadFiles.length > 0) {
              downloadFile = downloadFiles.shift()
              if (downloadFile) {
                session.defaultSession.downloadURL(downloadFile.url)
              }
            } else {
              downloadFile = null
            }
          })
      })
    }
  }
}
