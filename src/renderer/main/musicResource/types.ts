export type FilterId = 'topList' | string

export interface PlayListParams {
  offset: number
  filterId: FilterId
}

export interface TopListItem {
  coverImgUrl: string
  id: string
  sourceUrl: string
  title: string
}

export type ImgType = 'artist' | 'album'

export type ListType = 'playList' | 'album' | 'artist' | 'topList'

// 歌单
export interface SongListItem {
  id: string | number
  name: string
  coverImgUrl: string
  description: string
  sourceUrl: string
}

export interface Artist {
  id: string | number
  name: string
}

export interface Album {
  id: string | number
  name: string
  picUrl: string
}

export interface Track {
  id: string | number
  name: string
  artist: Artist[] // 歌手
  album: Album // 专辑
}

export interface SongListDetail {
  id: number | string
  name: string
  coverImgUrl: string
  description: string
  tracks: Track[]
  trackIds: (string | number)[]
}

export interface Song {
  id: number | string
  name: string
}

export type FilterType = 'topList'

export interface SongListParams {
  offset: number
  filter: FilterType
}

export interface SearchParams {
  keyword: string
  page: number
  type: string | number
}
