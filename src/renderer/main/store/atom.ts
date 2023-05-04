import { atom } from 'recoil'
import type { Music, PlayMode } from '../types'
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
