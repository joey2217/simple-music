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

export interface SongListDetail{
  id: number | string
  coverImgUrl:string
  description:string
}

export interface Song {
  id: number | string
  name: string
}

export type FilterType = 'topList'

export interface SongListParams{
  offset:number
  filter: FilterType
}

export interface SearchParams{
  keyword: string,
  page: number,
  type: string | number
}