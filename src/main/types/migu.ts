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
  image: unknown
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
  singers?: Artist[]
  album?: Album
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
  duration: string
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
  artists?: Artist[]
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

export type ArtistType = 'nan' | 'nv' | 'group'

export type ArtistArea = 'huayu' | 'oumei' | 'rihan'

export interface ArtistContent {
  view: string
  viewId: string
  action: string
  resType: string
  resId: string
  track: string
  txt: string
  txt2: string
  txt3: string
  txt4: string
  img: string
}

export interface ArtistData {
  header: {
    dataVersion: string
    title: string
  }
  contents: ArtistContent[]
}

export interface ArtistRes extends MiguRes {
  data: ArtistData
}

export interface ArtistInfo {
  id: string
  name: string
  smallPic: string
  mediumPic: string
  largePic: string
  intro: string
}

interface Album {
  id: string
  name: string
  type: number
}

export interface AlbumItem {
  name: string
  id: string
  type: number
  singers: Artist[]
  publishDate: string
  smallPic: string
  mediumPic: string
  largePic: string
  highlightStr: string[]
}

export interface PageData<T> {
  total: number
  items: T[]
}

export interface ArtistPageData {
  song: PageData<SongItem>
  album: PageData<AlbumItem>
  mv: PageData<unknown>
}

export interface BannerItem {
  title: string
  info: string
  image: string
  url: string
  field1?: unknown
}

export interface PlayListItem {
  playListId: string
  createUserId: string
  createUserName: string
  playListName: string
  image: string
  playCount: number
  sysSonglist: number
}

interface AlbumDetail {
  id: string
  name: string
  albumDesc: string
  type: number
  singers: Artist[]
  publishDate: string
  publishCompany: string
  smallPic: string
  mediumPic: string
  largePic: string
}

interface Songs {
  pageNo: number
  pageSize: number
  pageTotal: number
  itemTotal: number
  items: SongItem[]
}

export interface AlbumInfo {
  detailInfo: AlbumDetail
  songs: Songs
  otherAlbums: AlbumDetail[]
}

export interface PlayListTag {
  tagId: string
  tagName: string
  parentTagId?: string
}

interface Singer {
  singerId: string
  singerName: string
  singerStatus: number
}

export interface SongDetail {
  musicId: string
  musicName: string
  copyrightId11: string
  picUrl: string
  lyricWriter: string
  composer: string
  lyricUrl: string
  duration?: unknown
  albumId: string
  albumName: string
  musicStatus: number
  mcStatus: number
  mvStatus: number
  albumStatus: number
  mvId?: unknown
  mvPic?: unknown
  mvName?: unknown
  mvCopyrightId11?: unknown
  isDigitalAlbum: number
  digitalAlbumCopyright11?: unknown
  allowDownload: number
  vipFlag: number
  firstPublish: number
  singerNameStr?: unknown
  singers: Singer[]
  tags: PlayListTag[]
  format: string[]
}

export interface HotWordItem {
  note: string
  videoType: number
  icon?: string
  rank: number
  id: string
  word: string
  resourceType: string
  url?: string
}
interface hotWords {
  mode: number
  displayType: number
  hotwordList: HotWordItem[]
  playAll: number
  programDisplayType: string
  maxNum: number
  type: string
}

export interface SearchHorWord {
  discovery: unknown[]
  hotwords: hotWords[]
  quickEntryList: unknown[]
  songs: unknown[]
}

export interface LyricData {
  lyric: string
  sbslyric?: string
  translatedLyric?: string
}

interface SearchSuggestAlbum {
  id: string
  name: string
  singerName: string
  type: number
  copyrightId: string
  highlightStr: string[]
}
interface SearchSuggestSinger {
  id: string
  name: string
  highlightStr: string[]
}
interface SearchSuggestSong {
  id: string
  name: string
  singerName: string
  copyrightId: string
  highlightStr: string[]
}

export interface SearchSuggest {
  albums?: SearchSuggestAlbum[]
  singers?: SearchSuggestSinger[]
  songs?: SearchSuggestSong[]
}

interface TagList {
  tagid: number
  tagName: string
  tagDesc?: string
  tagPic?: string
  inserttime: string
  status: number
}
interface ContentList {
  songId: string
  contentId: string
  contentType: string
  contentName: string
  singerId: string
  singerName: string
}

export interface PlaylistInfo {
  createUserName?: string
  playListId: string
  playListType: string
  createUserId: string
  playListName: string
  summary: string
  image: string
  isDefault: number
  status: number
  createTime: string
  updateTime: string
  contentCount: string
  imageChangeType: number
  collecCount: number
  playCount: number
  tagLists: TagList[]
  contentList: ContentList[]
}
