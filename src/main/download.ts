import { app, session } from 'electron'
import type { DownloadInfo } from './types'

export function download(items: DownloadInfo[]) {
  session.defaultSession.downloadURL(items[0].url)
}

// https://www.electronjs.org/zh/docs/latest/api/download-item
app.whenReady().then(() => {
  session.defaultSession.on('will-download', (event, item, webContents) => {
    
    item.setSavePath('/tmp/save.pdf')

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
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  })
})
