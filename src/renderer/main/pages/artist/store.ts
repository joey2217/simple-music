import { atom, selector } from 'recoil'
import { fetchArtistAlbum, fetchArtistInfo, fetchArtistMv, fetchArtistSongs } from '../../api/artist'

export const artistIdState = atom<string>({
  key: 'artistIdState',
  default: '',
})

export const artistInfoState = selector({
  key: 'artistInfoState',
  get: ({ get }) => {
    const artistId = get(artistIdState)
    if (artistId) {
      return fetchArtistInfo(artistId)
    }
    return Promise.reject()
  },
})
// 单曲
export const artistPageState = atom({
  key: 'artistPageState',
  default: 1,
})

export const artistSongListState = selector({
  key: 'artistSongListState',
  get: ({ get }) => {
    const artistId = get(artistIdState)
    if (artistId) {
      const page = get(artistPageState)
      return fetchArtistSongs(artistId, { pn: page })
    }
    return Promise.reject()
  },
})
// 专辑
export const artistAlbumPageState = atom({
  key: 'artistAlbumPageState',
  default: 1,
})

export const artistAlbumState = selector({
  key: 'artistAlbumState',
  get: ({ get }) => {
    const artistId = get(artistIdState)
    if (artistId) {
      const page = get(artistAlbumPageState)
      return fetchArtistAlbum(artistId, { pn: page })
    }
    return Promise.reject()
  },
})

// MV
export const artistMVPageState = atom({
  key: 'artistMVPageState',
  default: 1,
})

export const artistMVState = selector({
  key: 'artistMVState',
  get: ({ get }) => {
    const artistId = get(artistIdState)
    if (artistId) {
      const page = get(artistMVPageState)
      return fetchArtistMv(artistId, { pn: page })
    }
    return Promise.reject()
  },
})