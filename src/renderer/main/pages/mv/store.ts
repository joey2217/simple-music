import { atom, selector, selectorFamily } from 'recoil'
import { fetchMvList, fetchMvUrl } from '../../api/mv'
import { fetchMusicInfoData } from '../../api/music'

export const MV_TAGS = [
  {
    name: '首播',
    id: 236682871,
  },
  {
    name: '华语',
    id: 236682731,
  },
  {
    name: '日韩',
    id: 236742444,
  },
  {
    name: '网络',
    id: 236682773,
  },
  {
    name: '欧美',
    id: 236682735,
  },
  {
    name: '现场',
    id: 236742576,
  },
  {
    name: '热舞',
    id: 236682777,
  },
  {
    name: '伤感',
    id: 236742508,
  },
  {
    name: '剧情',
    id: 236742578,
  },
]

export const mvTagIdState = atom<number>({
  key: 'mvTagIdState',
  default: MV_TAGS[0].id,
})

export const mvPageState = atom<number>({
  key: 'mvPageState',
  default: 1,
})

export const mvListState = selector({
  key: 'mvListState',
  get: ({ get }) => {
    const pId = get(mvTagIdState)
    const page = get(mvPageState)
    return fetchMvList(pId, { pn: page })
  },
})

export const mvUrlQuery = selectorFamily({
  key: 'mvUrlQuery',
  get: (mid: string | number) => () => {
    return fetchMvUrl(mid)
  },
})

export const mvDetailQuery = selectorFamily({
  key: 'mvUrlQuery',
  get: (mid: string | number) => () => {
    return fetchMusicInfoData(mid)
  },
})
