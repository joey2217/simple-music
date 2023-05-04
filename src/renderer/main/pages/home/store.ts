import { atom, selector } from 'recoil'
import type { Ranking, Tag } from '../../types'
import {
  fetchArtistTags,
  fetchRankingList,
  fetchIndexPlaylist,
} from '../../api/recommend'
import { fetchArtistList } from '../../api/artist'

// 首页排行榜
export const indexRankingListState = atom<Ranking[]>({
  key: 'indexRankingListState',
  default: fetchRankingList(),
})

// 首页歌手tag
export const artistTagState = atom<Tag[]>({
  key: 'fetchArtistTags',
  default: fetchArtistTags(),
})

export const currentArtistCategoryState = atom<number | string>({
  key: 'currentArtistCategoryState',
  default: '',
})

export const currentCategoryArtistListState = selector({
  key: 'currentCategoryArtistListState',
  get: ({ get }) => {
    const currentArtistCategory = get(currentArtistCategoryState)
    if (currentArtistCategory) {
      return fetchArtistList({ category: currentArtistCategory, pn: 1, rn: 6 })
    }
    return Promise.reject()
  },
})

// 首页歌单
export const indexPlaylistState = atom({
  key: 'indexPlaylistState',
  default: fetchIndexPlaylist({ id: 'rcm', pn: 1, rn: 5 }),
})
