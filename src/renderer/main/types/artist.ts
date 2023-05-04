export interface ArtistQueryParams {
  category: number | string
  pn: number
  rn: number
  prefix?: number | string
}

// 歌手
export interface Artist {
  artistFans: number
  albumNum: number
  mvNum: number
  pic: string
  musicNum: number
  pic120: string
  isStar: number
  content_type: string
  aartist: string
  name: string
  pic70: string
  id: number
  pic300: string
  timestamp: number
}

export interface ArtistInfo extends Artist {
  birthday: string
  country: string
  gener: string
  weight: string
  language: string
  upPcUrl: string
  birthplace: string
  constellation: string
  tall: string
  info: string
}
