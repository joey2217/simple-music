import type { SongItem, ColumnContent, SongDetail } from '../types/migu'
import type { Music, PlayMode } from '../types/player'
import { shuffle } from './index'
import icon from '../assets/icon.png'

export function songItem2Music(songItem: SongItem): Music {
  if (import.meta.env.DEV) {
    console.log('songItem2Music', songItem)
  }
  let pic = songItem.smallPic || songItem.mediumPic
  if (pic) {
    if (pic.startsWith('//')) {
      pic = `http:${pic}`
    }
  } else {
    pic = icon
  }

  return {
    copyrightId: songItem.copyrightId,
    title: songItem.name,
    artist: songItem.singers.map((s) => s.name).join('/'),
    artists: songItem.singers,
    album: songItem.album?.name,
    albumId: songItem.album?.id,
    pic,
  }
}

export function columnContent2Music(columnContent: ColumnContent): Music {
  const { albumImgs } = columnContent.objectInfo
  // if (import.meta.env.DEV) {
  //   console.log('columnContent2Music', columnContent)
  // }
  let { artists } = columnContent.objectInfo
  if (artists == null) {
    artists = []
    console.warn(
      'columnContent2Music artists is null',
      columnContent.objectInfo
    )
  }
  return {
    copyrightId: columnContent.objectInfo.copyrightId,
    title: columnContent.objectInfo.songName,
    artist: artists.map((s) => s.name).join('/'),
    artists,
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
    const num = Number(localData)
    if (!Number.isNaN(num)) {
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

export let autoplay = false
export function initPlayer() {
  autoplay = true
}

export let shuffleIndexList: number[] = []
export function setShuffleIndexList(l: number) {
  if (l > 0) {
    shuffleIndexList = shuffle(Array.from({ length: l }, (_item, i) => i))
  } else {
    shuffleIndexList = []
  }
}

export let index = 0
const LOCAL_INDEX = 'play-index'
function getLocalIndex() {
  const localData = localStorage.getItem(LOCAL_INDEX)
  if (localData) {
    index = Number(localData) || 0
  }
}
getLocalIndex()
export function setLocalIndex(i: number) {
  index = i
  localStorage.setItem(LOCAL_INDEX, i.toString())
}
