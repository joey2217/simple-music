import { useCallback } from 'react'
import { DownloadInfo } from 'src/renderer'
import { create } from 'zustand'
import { fetchSongInfo } from '../api/migu'
import type { Music } from '../types/player'

interface DownloadListState {
  list: DownloadInfo[]
  addDownloadItem: (item: DownloadInfo) => void
  removeDownloadItem: (item: DownloadInfo) => void
  updateDownloadItem: (item: DownloadInfo) => void
}

export const useDownloadListStore = create<DownloadListState>()((set) => ({
  list: [],
  addDownloadItem: (item: DownloadInfo) =>
    set((state) => ({ list: [item, ...state.list] })),
  removeDownloadItem: (item: DownloadInfo) =>
    set((state) => ({ list: state.list.filter((i) => i.rid !== item.rid) })),
  updateDownloadItem: (item: DownloadInfo) =>
    set((state) => {
      const index = state.list.findIndex((i) => i.rid === item.rid)
      if (index === -1) {
        return state
      }
      return { list: state.list.toSpliced(index, 1, item) }
    }),
}))

const DOWNLOAD_DIR_KEY = 'download_dir'

export let downloadDir = localStorage.getItem(DOWNLOAD_DIR_KEY) || ''

if (downloadDir === '') {
  window.electronAPI.getDownloadsPath().then((dir) => {
    localStorage.setItem(DOWNLOAD_DIR_KEY, dir)
    downloadDir = dir
  })
}

export function setLocalDownloadDir(dir: string) {
  localStorage.setItem(DOWNLOAD_DIR_KEY, dir)
  downloadDir = dir
}

export function useDownload() {
  const addDownloadItem = useDownloadListStore((state) => state.addDownloadItem)
  const download = useCallback(
    (m: Music) => {
      fetchSongInfo(m.copyrightId).then((data) => {
        const url = new URL(data.playUrl)
        const ext = url.pathname.split('.').pop()
        const item: DownloadInfo = {
          rid: m.copyrightId,
          url: data.playUrl,
          fileName: m.title,
          downloadPath: `${downloadDir}/${m.title}.${ext}`,
          title: m.title,
          artist: m.artist,
          album: m.album || '',
          cover: m.pic,
          status: 'init',
        }
        window.electronAPI.download([item])
        addDownloadItem(item)
      })
    },
    [addDownloadItem]
  )

  return download
}
