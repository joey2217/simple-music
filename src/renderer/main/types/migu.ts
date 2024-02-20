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
export interface Artist {
  id: string
  name: string
  image?: unknown
  nameSpelling?: string
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
  singers: Artist[]
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

export interface SongInfo {
  playUrl: string
  formatId: string
  salePrice: string
  bizType: string
  bizCode: string
  auditionsLength: number
}

export interface MiguRes {
  code: '000000'
  info: string
}

interface OpNumItem {
  playNum: number
  playNumDesc: string
  keepNum: number
  keepNumDesc: string
  commentNum: number
  commentNumDesc: string
  shareNum: number
  shareNumDesc: string
  orderNumByWeek: number
  orderNumByWeekDesc: string
  orderNumByTotal: number
  orderNumByTotalDesc: string
  thumbNum: number
  thumbNumDesc: string
  followNum: number
  followNumDesc: string
  subscribeNum: number
  subscribeNumDesc: string
  livePlayNum: number
  livePlayNumDesc: string
  popularNum: number
  popularNumDesc: string
  bookingNum: number
  bookingNumDesc: string
  settingNum: number
  settingNumDesc: string
  callNum: number
  callNumDesc: string
  callingPlayNum: number
  callingPlayNumDesc: string
  callingPlayDuration: number
  callingPlayDurationDesc: string
  calledPlayDuration: number
  calledPlayDurationDesc: string
  ringtoneAppPlayNum: number
  ringtoneAppPlayNumDesc: string
  ringtoneAppSettingNum: number
  ringtoneAppSettingNumDesc: string
}
export interface AlbumImg {
  imgSizeType: string
  img: string
  webpImg: string
}

interface RelatedSong {
  resourceType: string
  resourceTypeName: string
  copyrightId: string
  productId: string
}
interface RateFormat {
  resourceType: string
  formatType: string
  format: string
  size: string
  fileType?: string
  price: string
  androidFileType?: string
  iosFileType?: string
  iosSize?: string
  androidSize?: string
  iosFormat?: string
  androidFormat?: string
  iosAccuracyLevel?: string
  androidAccuracyLevel?: string
}
interface NewRateFormat {
  resourceType: string
  formatType: string
  format?: string
  size?: string
  fileType?: string
  price: string
  androidFileType?: string
  iosFileType?: string
  iosSize?: string
  androidSize?: string
  iosFormat?: string
  androidFormat?: string
  iosAccuracyLevel?: string
  androidAccuracyLevel?: string
  androidNewFormat?: string
  iosBit?: number
  androidBit?: number
}
interface TagList {
  resourceType: string
  tagId: string
  tagName: string
  tagDesc?: string
}
interface PQ {
  codeRateChargeAuditions: string
  isCodeRateDownload: string
  codeRateFileSize: string
}
interface ZQ {
  codeRateChargeAuditions: string
  isCodeRateDownload: string
}
interface SQ {
  codeRateChargeAuditions: string
  isCodeRateDownload: string
  contentIdSQ: string
}
interface CodeRate {
  PQ: PQ
  ZQ?: ZQ
  HQ: ZQ
  SQ?: SQ
}
interface MiguImgItem {
  imgSizeType: string
  img: string
  fileId: string
  webpImg: string
}
interface SingerImg {
  singerName: string
  miguImgItems: MiguImgItem[]
}

export interface SongObjectInfo {
  resourceType: string
  refId: string
  copyrightId: string
  contentId: string
  songId: string
  songName: string
  singerId: string
  singer: string
  albumId: string
  album: string
  albumImgs: AlbumImg[]
  opNumItem: OpNumItem
  toneControl: string
  relatedSongs: RelatedSong[]
  rateFormats: RateFormat[]
  newRateFormats: NewRateFormat[]
  lrcUrl: string
  tagList: TagList[]
  digitalColumnId: string
  copyright: string
  validStatus: boolean
  songDescs: string
  songAliasName: string
  isInDAlbum: string
  isInSideDalbum: string
  isInSalesPeriod: string
  songType: string
  mrcUrl: string
  invalidateDate: string
  dalbumId: string
  trcUrl: string
  vipType: string
  scopeOfcopyright: string
  auditionsType: string
  firstIcon: string
  chargeAuditions: string
  oldChargeAuditions: string
  songIcon: string
  codeRate: CodeRate
  isDownload: string
  copyrightType: string
  hasMv: string
  mvCopyright?: string
  topQuality: string
  preSale: string
  isShare: string
  isCollection: string
  length: string
  singerImg: { [p: string]: SingerImg }
  songNamePinyin: string
  albumNamePinyin: string
  artists: Artist[]
  landscapImg: string
  vipLogo: string
  vipDownload: string
  firstPublish: string
  showTag: string[]
  materialValidStatus: boolean
  needEncrypt: string
  foreverListenFlag?: string
  foreverListen: boolean
}
export interface ColumnContent {
  contentId: string
  relationType: number
  objectInfo: SongObjectInfo
  rankingChanges: string
  relationSort: number
}

export interface ColumnInfo {
  columnTitle: string
  columnId: string
  columnPid: string
  opNumItem: OpNumItem
  contentsCount: number
  columnStatus: number
  columnCreateTime: string
  columntype: number
  contents: ColumnContent[]
  activeDate: string
  columnPicUrl: string
  columnSmallpicUrl: string
  styleCode: string
  columnDes: string
  dataVersion: string
  columnSubtitle: string
  defaultContentStyleCode: string
  customizedPicUrls: unknown[]
  recommendPicUrl: string
}

export interface RankingListData extends MiguRes {
  columnInfo: ColumnInfo
}
