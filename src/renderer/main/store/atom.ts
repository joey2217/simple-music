import { atom } from 'recoil'
import type { DownloadMusic, Music, PlayMode } from '../types'
import { localStorageEffect } from './utils'
import type { Artist } from '../types/artist'
import { getMusicLikeList } from '../db/music'
import { getArtistLikeList } from '../db/artist'
import { getPlaylist } from '../db/playlist'
import { fetchSearchKeys } from '../api/search'

export const playListState = atom<Music[]>({
  key: 'playListState',
  default: getPlaylist(),
})

export const currentPlayIndexState = atom<number>({
  key: 'currentPlayIndexState',
  default: 0,
  effects: [localStorageEffect('currentPlayIndex')],
})

export const playingState = atom<boolean>({
  key: 'playingState',
  default: false,
})

export const playModeState = atom<PlayMode>({
  key: 'playModeState',
  default: 'loop',
  effects: [localStorageEffect('playModeState')],
})

export const likeMusicState = atom<Music[]>({
  key: 'likeMusicState',
  default: getMusicLikeList(),
})

export const likeArtistState = atom<Artist[]>({
  key: 'likeArtistState',
  default: getArtistLikeList(),
})

export const playerVolumeState = atom<number>({
  key: 'playerVolumeState',
  default: 50,
  effects: [localStorageEffect('playerVolume')],
})

export const searchValueState = atom({
  key: 'searchValueState',
  default: '',
})

export const searchKeywordState = atom({
  key: 'searchKeywordState',
  default: '',
})

export const defaultSearchHotKeysState = atom<string[]>({
  key: 'defaultSearchHotKeysState',
  default: fetchSearchKeys(),
})

const DOWNLOAD_PATH = 'download_path'

export const downloadPathState = atom<string>({
  key: 'downloadPathState',
  default: '',
  effects: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem(DOWNLOAD_PATH)
      let localDownloadPath = ''
      if (savedValue != null) {
        try {
          const parseData = JSON.parse(savedValue)
          localDownloadPath = parseData as string
        } catch (error) {}
      }
      if (localDownloadPath) {
        setSelf(localDownloadPath)
      } else {
        setSelf(window.electronAPI.getDownloadsPath())
      }
      onSet((newValue) => {
        localStorage.setItem(DOWNLOAD_PATH, JSON.stringify(newValue))
        window.electronAPI.setDownloadPath(newValue)
      })
    },
  ],
})

export const downloadListState = atom<DownloadMusic[]>({
  key: 'downloadListState',
  default: [],
})
