import { selectorFamily } from 'recoil'
import { fetchAlbum } from '../../api/album'

export const albumQuery = selectorFamily({
  key: 'albumQuery',
  get: (albumId: string | number) => () => {
    return fetchAlbum(albumId)
  },
})
