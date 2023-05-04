import { atom, selector } from 'recoil'
import type { RankingMenu, RankingMenuItem } from '../../types/ranking'
import { fetchRankingMenu, fetchRankingList } from '../../api/ranking'

export const rankingMenuState = atom<RankingMenu[]>({
  key: 'rankingMenuState',
  default: fetchRankingMenu(),
})

export const currentRankingState = atom<RankingMenuItem | null>({
  key: 'currentRankingState',
  default: null,
})

export const pageState = atom<number>({
  key: 'pageState',
  default: 1,
})

export const rankingListState = selector({
  key: 'rankingListState',
  get: ({ get }) => {
    const page = get(pageState)
    const ranking = get(currentRankingState)
    if (ranking) {
      return fetchRankingList(ranking.sourceid, page)
    }
    return Promise.reject()
  },
})
