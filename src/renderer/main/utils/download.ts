import { fetchMusicInfo } from '../api/musicInfo'
import type { SongListItem } from '../types'

export function download(songs: SongListItem[]) {
  console.log(songs)
  const res = songs.map((song) => {
    return fetchMusicInfo(song.rid)
  })
  return Promise.all(res).then((list) => {
    const downloadItems = list.map((item) => ({
      rid: item.rid,
      url: item.url,
      fileName: `${item.name}.mp3`,
    }))
    window.electronAPI.download(downloadItems)
  })
}
