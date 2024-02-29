import { DownloadStatus } from 'src/renderer'

export const DOWNLOAD_STATUS: { [p in DownloadStatus]: string } = {
  init: '排队中',
  downloading: '下载中',
  completed: '完成',
  failed: '失败',
}
