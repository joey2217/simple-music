export interface SearchSinger {
  id: string
  name: string
  smallPic: string
  mediumPic: string
  largePic: string
  songNum: number
  albumNum: number
  mvNum: number
  highlightStr?: unknown
}
interface BestShow {
  bestShowSinger: SearchSinger
  bestShowAlbum?: unknown
  bestShowMv?: unknown
}
interface Singer {
  id: string
  name: string
  image?: unknown
}
interface Album {
  id: string
  name: string
  type: number
}
interface Mv {
  copyrightId: string
  productId: string
}
interface Crbt {
  name: string
  copyrightId: string
  productId: string
  type: string
  price: string
  vipFlag: number
  vipDownload: number
  auditionsType?: unknown
  auditionsLength?: unknown
  firstPublish: number
  allowDownload: number
  toneType: string
  auditionsFlag: number
  accuracyLevel: number
  specialArea?: unknown
  copyrightScope?: unknown
  libraryType?: unknown
  audio3D: number
  concertId?: unknown
  vrbtPublic: number
  province?: unknown
  nineSeconds: number
  productLength?: unknown
  aspectRatio?: unknown
  formatId: string
}
interface Ring {
  name: string
  copyrightId: string
  productId: string
  type: string
  price: string
  vipFlag: number
  vipDownload: number
  auditionsType?: unknown
  auditionsLength?: unknown
  firstPublish: number
  allowDownload: number
  toneType?: unknown
  auditionsFlag: number
  accuracyLevel: number
  specialArea?: unknown
  copyrightScope?: unknown
  libraryType?: unknown
  audio3D: number
  concertId?: unknown
  vrbtPublic: number
  province?: unknown
  nineSeconds: number
  productLength: string
  aspectRatio?: unknown
  formatId: string
}
interface FullSong {
  name: string
  copyrightId: string
  productId: string
  type: string
  price: string
  vipFlag: number
  vipDownload: number
  auditionsType: string
  auditionsLength: string
  firstPublish: number
  allowDownload: number
  toneType?: unknown
  auditionsFlag: number
  accuracyLevel: number
  specialArea?: unknown
  copyrightScope?: unknown
  libraryType?: unknown
  audio3D: number
  concertId?: unknown
  vrbtPublic: number
  province?: unknown
  nineSeconds: number
  productLength?: unknown
  aspectRatio?: unknown
  formatId: string
}

export interface SongItem {
  id: string
  name: string
  copyrightId: string
  singers: Singer[]
  album: Album
  mv?: Mv
  crbt?: Crbt
  ring: Ring
  fullSong: FullSong
  walkMan: FullSong
  hq: FullSong
  sq: FullSong
  bit24?: FullSong
  d3?: FullSong
  smallPic: string
  mediumPic: string
  largePic: string
  lyric?: unknown
  highlightStr: string[]
}

interface SongsData {
  total: number
  items: SongItem[]
}

export interface SearchData {
  bestShow: BestShow
  songResult?: unknown
  tagSongResult?: unknown
  songsData: SongsData
  tagPriority: number
  total: number
}

export interface MiguResponse<T> {
  code: '200'
  msg: string
  data: T
}
