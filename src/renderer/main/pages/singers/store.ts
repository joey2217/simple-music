import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import type { Singer } from '../../types'
import { fetchSingerList } from '../../api/singer'

export interface Params {
  page: number
  category: number
  prefix: string | number
}

export const paramsState = atom<Params>({
  key: 'paramsState',
  default: {
    page: 1,
    category: 0,
    prefix: '',
  },
})

export const singerListState = atom<Singer[]>({
  key: 'singerListState',
  default: [],
})

const singerListQuery = selector({
  key: 'singerListQuery',
  get: async ({ get }) => {
    const params = get(paramsState)
    return fetchSingerList(params.category, params.prefix, params.page)
  },
})

export function useSingerList() {
  const [params, setParams] = useRecoilState(paramsState)
  const { list, total } = useRecoilValue(singerListQuery)
  return {
    params,
    setParams,
    singerList: list,
    total,
  }
}
