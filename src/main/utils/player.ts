import type { SongItem, ColumnContent, SongDetail } from '../types/migu'
import type { Music, PlayMode } from '../types/player'

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

export function songDetail2Music(songDetail: SongDetail): Music {
  return {
    copyrightId: songDetail.copyrightId11,
    title: songDetail.musicName,
    artist: songDetail.singers.map((s) => s.singerName).join('/'),
    artists: songDetail.singers.map((s) => ({
      id: s.singerId,
      name: s.singerName,
      image: '',
    })),
    album: songDetail.albumId,
    albumId: songDetail.albumName,
    pic: songDetail.picUrl,
  }
}

export let vol = 100

const VOL_KEY = 'vol'
function getVol() {
  const localData = localStorage.getItem(VOL_KEY)
  if (localData) {
    const num = Number(vol)
    if (num) {
      vol = num
    }
  }
}
getVol()

export function setVol(num: number) {
  vol = num
  localStorage.setItem(VOL_KEY, num.toString())
}

export let mode: PlayMode = 'sequence'

const MODE_KEY = 'play_mode'

function getMode() {
  const localData = localStorage.getItem(MODE_KEY)
  if (localData) {
    mode = localData as PlayMode
  }
}
getMode()

export function setMode(newMode: PlayMode) {
  mode = newMode
  localStorage.setItem(MODE_KEY, newMode)
}
