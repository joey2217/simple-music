import { atom, selector } from 'recoil'
import type { ArtistQueryParams } from '../../types/artist'
import { fetchArtistList } from '../../api/artist'

export const artistListParamsState = atom<ArtistQueryParams>({
  key: 'artistListParamsState',
  default: {
    pn: 1,
    rn: 60,
    prefix: '',
    category: 0,
  },
})

export const artistListState = selector({
  key: 'artistListState',
  get: ({ get }) => {
    const params = get(artistListParamsState)
    return fetchArtistList(params)
  },
})
