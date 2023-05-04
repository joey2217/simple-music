import type { Music } from '.'

export interface RankingMenu {
  name: string
  list: RankingMenuItem[]
}

export interface RankingMenuItem {
  sourceid: string
  intro: string
  name: string
  id: string
  source: string
  pic: string
  pub: string
}

export interface RankingListData {
  img: string
  num: string
  pub: string
  musicList: Music[]
}
