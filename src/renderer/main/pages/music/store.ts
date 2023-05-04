import { selectorFamily } from 'recoil'
import { fetchMusicInfoData } from '../../api/music'
import { fetchLyric } from '../../api/lyric'

export const musicQuery = selectorFamily({
  key: 'musicQuery',
  get: (musicId: string | number) => () => {
    return fetchMusicInfoData(musicId)
  },
})

export const musicLyricQuery = selectorFamily({
  key: 'musicLyricQuery',
  get: (musicId: string | number) => () => {
    return fetchLyric(musicId)
  },
})
