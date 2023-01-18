export interface BoardItem {
  id: string
  name: string
  disname: string
  info: string
  source: string
  sourceid: string
  pic: string
  like: string
  listen: string
  tips: string
  isnew: string
  newcnt: string
  attribute: string
  child: any[]
}

export interface SongListData {
  img: string
  num: string
  pub: string
  musicList: SongListItem[]
}

export interface SongListItem {
  musicrid: string
  barrage: string
  ad_type: string
  artist: string
  mvpayinfo: Mvpayinfo
  trend: Trend
  pic: string
  isstar: number
  rid: number
  duration: number
  score100: string
  ad_subtype: string
  content_type: string
  rank_change: string
  track: number
  hasLossless: boolean
  hasmv: number
  releaseDate: Date
  album: string
  albumid: number
  pay: string
  artistid: number
  albumpic: string
  originalsongtype: number
  songTimeMinutes: string
  isListenFee: boolean
  pic120: string
  name: string
  online: number
  payInfo: PayInfo
  tme_musician_adtype: string
  nationid?: string
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
  listen_fragment?: string
}

export interface FeeType {
  song: string
  vip: string
}

export enum Trend {
  D0 = 'd0',
  E0 = 'e0',
  U0 = 'u0',
}

export interface MusicInfo {
  musicrid: string
  barrage: string
  ad_type: string
  artist: string
  mvpayinfo: Mvpayinfo
  pic: string
  isstar: number
  rid: number
  upPcStr: string
  duration: number
  score100: string
  ad_subtype: string
  content_type: string
  mvPlayCnt: number
  track: number
  hasLossless: boolean
  hasmv: number
  releaseDate: Date
  album: string
  albumid: number
  pay: string
  artistid: number
  albumpic: string
  originalsongtype: number
  songTimeMinutes: string
  isListenFee: boolean
  mvUpPcStr: string
  pic120: string
  albuminfo: string
  name: string
  online: number
  payInfo: PayInfo
  tme_musician_adtype: string
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
}

export interface FeeType {
  song: string
  vip: string
}
