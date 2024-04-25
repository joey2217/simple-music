export type DownloadStatus = 'init' | 'downloading' | 'completed' | 'failed'

export interface DownloadInfo {
  fileName: string
  downloadPath: string
  rid: string
  url: string
  title: string
  artist: string
  album: string
  cover: string
  status: DownloadStatus
  lyric?: string
}

export type Theme = "system" | "light" | "dark"

export type UpdateType = 'auto' | 'hint' | 'manual'
