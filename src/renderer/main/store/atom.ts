import { atom } from 'recoil'
import {
  getTheme,
  simpleLocalStorageEffect,
  LOCAL_THEME,
  setTheme,
} from './utils'
import type { Theme } from './utils'
import type { SongListItem, MusicInfo } from '../types'

export const themeState = atom<Theme>({
  key: 'themeState',
  default: getTheme(),
  effects: [
    simpleLocalStorageEffect<Theme>(LOCAL_THEME),
    ({ onSet }) => {
      onSet((theme) => {
        setTheme(theme)
      })
    },
  ],
})

// TODO 持久化
export const playListState = atom<SongListItem[]>({
  key: 'playListState',
  default: [],
})

export const currentPlayState = atom<MusicInfo | null>({
  key: 'currentPlayState',
  default: null,
})
