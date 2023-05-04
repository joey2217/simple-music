import { selector } from 'recoil'
import {
  playListState,
  currentPlayIndexState,
  likeMusicState,
  likeArtistState,
  playModeState,
  searchValueState,
} from './atom'
import { fetchMusicInfoData, fetchMusicUrl } from '../api/music'
import type { Music } from '../types'
import { shuffle } from '../utils'
import { fetchLyric } from '../api/lyric'
import { fetchSearchKeys } from '../api/search'

export const currentPlayState = selector<Music | null>({
  key: 'currentPlayState',
  get: ({ get }) => {
    const playList = get(playListState)
    const index = get(currentPlayIndexState)
    if (playList[index]) {
      return playList[index]
    }
    return null
  },
})

export const currentPlayUrlState = selector<string>({
  key: 'currentPlayUrlState',
  get: ({ get }) => {
    const current = get(currentPlayState)
    if (current) {
      return fetchMusicUrl(current.rid)
    }
    return Promise.reject('')
  },
})

export const currentPlayLyricState = selector({
  key: 'currentPlayLyricState',
  get: ({ get }) => {
    const current = get(currentPlayState)
    if (current) {
      return fetchLyric(current.rid)
    }
    return Promise.reject('')
  },
})

export const currentPlayMusicInfoState = selector<Music>({
  key: 'currentPlayMusicInfoState',
  get: ({ get }) => {
    const current = get(currentPlayState)
    if (current) {
      return fetchMusicInfoData(current.rid)
    }
    return Promise.reject(null)
  },
})

export const musicLikeIdsState = selector<number[]>({
  key: 'musicLikeIdsState',
  get: ({ get }) => {
    const likeMusic = get(likeMusicState)
    return likeMusic.map((m) => m.rid)
  },
})

export const artistLikeIdsState = selector<number[]>({
  key: 'artistLikeIdsState',
  get: ({ get }) => {
    const likeArtist = get(likeArtistState)
    return likeArtist.map((m) => m.id)
  },
})

export const shufflePlayIndexListState = selector<number[]>({
  key: 'shufflePlayIndexListState',
  get: ({ get }) => {
    const playMode = get(playModeState)
    if (playMode === 'shuffle') {
      const playList = get(playListState)
      const arr = Array.from({ length: playList.length }).map(
        (_item, index) => index
      )
      return shuffle(arr)
    }
    return []
  },
})

export const searchHotKeysState = selector<string[]>({
  key: 'searchHotKeysState',
  get: ({ get }) => {
    const searchValue = get(searchValueState)
    if (searchValue) {
      return fetchSearchKeys(searchValue)
    }
    return Promise.reject()
  },
})
