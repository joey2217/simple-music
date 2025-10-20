export interface PageData<T> {
  list: T[];
  total: number;
}

export interface PageParams {
  pn: number;
  rn: number;
}

export interface Tag {
  name: string;
  digest?: string;
  id: string;
}

// 首页排行榜
export interface Ranking {
  leader: string;
  num: string;
  name: string;
  pic: string;
  id: string;
  pub: Date;
  musicList: Music[];
}

// 音乐数据
export interface Music {
  musicrid: string;
  barrage: string;
  ad_type: string;
  artist: string;
  mvpayinfo: Mvpayinfo;
  pic: string;
  isstar: number;
  rid: number;
  duration: number;
  score100: string;
  ad_subtype: string;
  content_type: string;
  track: number;
  hasmv: number;
  releaseDate: string;
  album: string;
  albumid: number;
  pay: string;
  artistid: number;
  albumpic: string;
  albuminfo: string;
  originalsongtype: number;
  isListenFee: boolean;
  pic120: string;
  name: string;
  online: number;
  payInfo: PayInfo;
  tme_musician_adtype: string;
  songTimeMinutes: string;
  timestamp: number;
  mvPlayCnt: number;
  url: string;
}

export type DownloadStatus = "success" | "downloading" | "failed";

export interface DownloadMusic extends Music {
  fileName: string;
  downloadPath: string;
  status: DownloadStatus;
}

// MV
export interface Mv {
  duration: number;
  artist: string;
  mvPlayCnt: number;
  name: string;
  online: string;
  artistid: number;
  songTimeMinutes: string;
  id: string;
  pic: string;
}

// 专辑
export interface Album {
  content_type: string;
  albuminfo: string;
  artist: string;
  releaseDate: string;
  album: string;
  albumid: number;
  pay: number;
  artistid: number;
  pic: string;
  isstar: number;
  lang: string;
  playCnt: number;
  total: number;
  musicList: Music[];
}

export interface PlaylistParams {
  id: number | string;
  pn: number;
  rn: number;
}

// 播放模式
export type PlayMode = "single" | "loop" | "sequence" | "shuffle";

export interface Lyric {
  lineLyric: string;
  time: number;
}

export type DownloadMusicPattern = "artist_name" | "name_artist" | "name";

export interface DownloadSetting {
  pattern: DownloadMusicPattern;
}

export interface SearchMusicResult {
  ARTISTPIC: string;
  HIT: string;
  HITMODE: string;
  HIT_BUT_OFFLINE: string;
  MSHOW: string;
  NEW: string;
  PN: string;
  RN: string;
  SHOW: string;
  TOTAL: string;
  UK: string;
  abslist: Abslist[];
  searchgroup: string;
}
interface Abslist {
  AARTIST: string;
  ALBUM: string;
  ALBUMID: string;
  ALIAS: string;
  ARTIST: string;
  ARTISTID: string;
  CanSetRing: string;
  CanSetRingback: string;
  DC_TARGETID: string;
  DC_TARGETTYPE: string;
  DURATION: string;
  FARTIST: string;
  FORMAT: string;
  FSONGNAME: string;
  KMARK: string;
  MINFO: string;
  MUSICRID: string;
  MVFLAG: string;
  MVPIC: string;
  MVQUALITY: string;
  NAME: string;
  NEW: string;
  N_MINFO: string;
  ONLINE: string;
  PAY: string;
  PROVIDER: string;
  SONGNAME: string;
  SUBLIST: unknown[];
  SUBTITLE: string;
  TAG: string;
  ad_subtype: string;
  ad_type: string;
  allartistid: string;
  audiobookpayinfo: Audiobookpayinfo;
  barrage: string;
  cache_status: string;
  content_type: string;
  fpay: string;
  hts_MVPIC: string;
  info: string;
  iot_info: string;
  isRedSong: number;
  isdownload: string;
  isshowtype: string;
  isstar: string;
  mvpayinfo: Mvpayinfo;
  nationid: string;
  opay: string;
  originalsongtype: string;
  overseas_copyright: string;
  overseas_pay: string;
  payInfo: PayInfo;
  react_type: string;
  signal: string;
  spPrivilege: string;
  subsStrategy: string;
  subsText: string;
  svip_preview: string;
  terminal: string;
  terminalOnline: string;
  tme_musician_adtype: string;
  tpay: string;
  web_albumpic_short: string;
  web_artistpic_short: string;
  web_timingonline: string;
}
interface PayInfo {
  cannotDownload: string;
  cannotOnlinePlay: string;
  down: string;
  download: string;
  extendAttr: number;
  feeType: FeeType;
  limitfree: string;
  listen_fragment: string;
  local_encrypt: string;
  ndown: string;
  nplay: string;
  overseas_ndown: string;
  overseas_nplay: string;
  paytagindex: Paytagindex;
  paytype: number;
  play: string;
  refrain_end: string;
  refrain_start: string;
  tips_intercept: string;
}
interface Paytagindex {
  AR501: number;
  DB: number;
  F: number;
  H: number;
  HR: number;
  L: number;
  S: number;
  ZP: number;
  ZPGA201: number;
  ZPGA501: number;
  ZPLY: number;
}
interface FeeType {
  album: string;
  bookvip: string;
  song: string;
  vip: string;
}
interface Mvpayinfo {
  down: string;
  download: string;
  play: string;
  vid: string;
}
interface Audiobookpayinfo {
  download: string;
  play: string;
}
