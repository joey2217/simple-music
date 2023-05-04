import { atom, selector } from 'recoil'
import { searchKeywordState } from '../../store/atom'
import {
  fetchSearchAlbum,
  fetchSearchArtist,
  fetchSearchMV,
  fetchSearchMusic,
  fetchSearchSongList,
} from '../../api/search'

// 单曲
export const searchSongPageState = atom({
  key: 'searchSongPageState',
  default: 1,
})
export const searchSongQuery = selector({
  key: 'searchSongQuery',
  get: ({ get }) => {
    const page = get(searchSongPageState)
    const keyword = get(searchKeywordState)
    if (keyword) {
      return fetchSearchMusic(keyword, { pn: page })
    }
    return Promise.reject()
  },
})

// 专辑
export const searchAlbumPageState = atom({
  key: 'searchAlbumPageState',
  default: 1,
})

export const searchAlbumQuery = selector({
  key: 'searchAlbumQuery',
  get: ({ get }) => {
    const page = get(searchAlbumPageState)
    const keyword = get(searchKeywordState)
    if (keyword) {
      return fetchSearchAlbum(keyword, { pn: page })
    }
    return Promise.reject()
  },
})
// MV
export const searchMVPageState = atom({
  key: 'searchMVPageState',
  default: 1,
})
export const searchMVQuery = selector({
  key: 'searchMVQuery',
  get: ({ get }) => {
    const page = get(searchMVPageState)
    const keyword = get(searchKeywordState)
    if (keyword) {
      return fetchSearchMV(keyword, { pn: page })
    }
    return Promise.reject()
  },
})
// 歌单
export const searchSongListPageState = atom({
  key: 'searchSongListPageState',
  default: 1,
})
export const searchSongListQuery = selector({
  key: 'searchSongListQuery',
  get: ({ get }) => {
    const page = get(searchSongListPageState)
    const keyword = get(searchKeywordState)
    if (keyword) {
      return fetchSearchSongList(keyword, { pn: page })
    }
    return Promise.reject()
  },
})

// 歌手
export const searchArtistPageState = atom({
  key: 'searchArtistPageState',
  default: 1,
})
export const searchArtistQuery = selector({
  key: 'searchArtistQuery',
  get: ({ get }) => {
    const page = get(searchArtistPageState)
    const keyword = get(searchKeywordState)
    if (keyword) {
      return fetchSearchArtist(keyword, { pn: page })
    }
    return Promise.reject()
  },
})
