import { atom } from 'recoil'
import type { SongListItem } from '../../types'

export const searchSongListState = atom<SongListItem[]>({
  key: 'searchSongListState',
  default: [],
})

export const pageState = atom<number>({
    key: 'pageState',
    default: 1
})

export const totalState = atom<number>({
    key: 'totalState',
    default: 0
})