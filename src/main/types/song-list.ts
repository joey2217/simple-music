import type { Music } from "."

export interface SongListTag {
  img: string
  mdigest: string
  data: Datum[]
  name: string
  id: string
  type: string
  img1: string
}

export interface Datum {
  extend: string
  img: string
  digest: string
  name: string
  isnew: string
  id: string
}

export interface SongListItem {
  img: string
  uname: string
  lossless_mark: string
  favorcnt: string
  isnew: string
  extend: string
  uid: string
  total: string
  commentcnt: string
  imgscript: string
  digest: string
  name: string
  listencnt: string
  id: string
  attribute: string
  radio_id: string
  desc: string
  info: string
}

export interface SongListDetail {
  img: string
  uPic: string
  uname: string
  img700: string
  img300: string
  userName: string
  img500: string
  isOfficial: number
  total: number
  name: string
  listencnt: number
  id: number
  tag: string
  desc: string
  info: string
  musicList: Music[]
}