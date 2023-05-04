export interface PageData<T> {
  list: T[]
  total: number
}

export interface PageParams {
  pn: number
  rn: number
}

export interface Tag {
  name: string
  digest?: string
  id: string
}

// 首页排行榜
export interface Ranking {
  leader: string
  num: string
  name: string
  pic: string
  id: string
  pub: Date
  musicList: Music[]
}

// 音乐数据
export interface Music {
  musicrid: string
  barrage: string
  ad_type: string
  artist: string
  mvpayinfo: Mvpayinfo
  pic: string
  isstar: number
  rid: number
  duration: number
  score100: string
  ad_subtype: string
  content_type: string
  track: number
  hasmv: number
  releaseDate: string
  album: string
  albumid: number
  pay: string
  artistid: number
  albumpic: string
  albuminfo: string
  originalsongtype: number
  isListenFee: boolean
  pic120: string
  name: string
  online: number
  payInfo: PayInfo
  tme_musician_adtype: string
  songTimeMinutes: string
  timestamp: number
  mvPlayCnt: number
  url: string
}

export interface Mvpayinfo {
  play: number
  vid: number
  down: number
}

export interface PayInfo {
  play: string
  nplay: string
  overseas_nplay: string
  local_encrypt: string
  limitfree: number
  refrain_start: number
  feeType: FeeType
  down: string
  ndown: string
  download: string
  cannotDownload: number
  overseas_ndown: string
  refrain_end: number
  cannotOnlinePlay: number
  paytagindex: { [key: string]: number }
  listen_fragment?: string
}

export interface FeeType {
  song?: string
  vip: string
}

// MV
export interface Mv {
  duration: number
  artist: string
  mvPlayCnt: number
  name: string
  online: string
  artistid: number
  songTimeMinutes: string
  id: string
  pic: string
}

// 专辑
export interface Album {
  content_type: string
  albuminfo: string
  artist: string
  releaseDate: string
  album: string
  albumid: number
  pay: number
  artistid: number
  pic: string
  isstar: number
  lang: string
  playCnt: number
  total: number
  musicList: Music[]
}

export interface PlaylistParams {
  id: number | string
  pn: number
  rn: number
}

// 播放模式
export type PlayMode = 'single' | 'loop' | 'sequence' | 'shuffle'

export interface Lyric {
  lineLyric: string
  time: number
}
