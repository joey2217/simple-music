import { atom } from 'recoil'
import {
  getTheme,
  simpleLocalStorageEffect,
  LOCAL_THEME,
  setTheme,
} from './utils'
import { getDownloadsPath, setDownloadPath } from '../utils/ipc'
import type { Theme } from './utils'
import type { SongListItem, MusicInfo, DownloadItem } from '../types'

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

export const playingState = atom<boolean>({
  key: 'playingState',
  default: false,
})

const LOCAL_DOWNLOAD_PATH = 'download_path'

export const downloadPathState = atom({
  key: 'downloadPathState',
  default: '',
  effects: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem(LOCAL_DOWNLOAD_PATH)
      console.log('downloadPathState', savedValue, LOCAL_DOWNLOAD_PATH)
      if (savedValue != null) {
        setSelf(savedValue)
      } else {
        getDownloadsPath().then((downloadsPath) => {
          setSelf(downloadsPath)
        })
      }

      onSet((newValue, _, isReset) => {
        console.log(newValue, isReset)
        setDownloadPath(newValue)
        isReset
          ? localStorage.removeItem(LOCAL_DOWNLOAD_PATH)
          : localStorage.setItem(LOCAL_DOWNLOAD_PATH, newValue as string)
      })
    },
  ],
})

export const downloadItemsState = atom<DownloadItem[]>({
  key: 'downloadItemsState',
  default: [],
})
