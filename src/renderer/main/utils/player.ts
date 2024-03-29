import type { SongItem, ColumnContent } from '../types/migu'
import type { Music } from '../types/player'

export function songItem2Music(songItem: SongItem): Music {
  console.log('songItem2Music', songItem)
  return {
    copyrightId: songItem.copyrightId,
    title: songItem.name,
    artist: songItem.singers.map((s) => s.name).join('/'),
    artists: songItem.singers,
    album: songItem.album?.name,
    albumId: songItem.album?.id,
    pic: songItem.smallPic,
  }
}

export function columnContent2Music(columnContent: ColumnContent): Music {
  const { albumImgs } = columnContent.objectInfo
  console.log('columnContent2Music', columnContent)
  return {
    copyrightId: columnContent.objectInfo.copyrightId,
    title: columnContent.objectInfo.songName,
    artist: columnContent.objectInfo.artists.map((s) => s.name).join('/'),
    artists: columnContent.objectInfo.artists,
    album: columnContent.objectInfo.album,
    albumId: columnContent.objectInfo.albumId,
    pic: albumImgs[albumImgs.length - 1].webpImg,
  }
}

export let vol = 100

const VOL_KEY = 'vol'
const localData = localStorage.getItem(VOL_KEY)
if (localData) {
  const num = Number(vol)
  if (num) {
    vol = num
  }
}

export function setVol(num: number) {
  localStorage.setItem(VOL_KEY, num.toString())
}
