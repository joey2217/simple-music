import request from './request'
import type { Artist, ArtistInfo, ArtistQueryParams } from '../types/artist'
import type { Music, PageData, PageParams, Album, Mv } from '../types'

const DEFAULT_ARTIST_QUERY_PARAMS: ArtistQueryParams = {
  category: 11,
  pn: 1,
  rn: 6,
}

// https://kuwo.cn/api/www/artist/artistInfo?category=11&pn=1&rn=6&httpsStatus=1&reqId=e19729c0-d8d4-11ed-8bc6-77b3761f7393
// 歌手
export function fetchArtistList(
  query?: Partial<ArtistQueryParams>
): Promise<PageData<Artist>> {
  const params = {
    ...DEFAULT_ARTIST_QUERY_PARAMS,
    ...query,
  }
  return request({
    url: '/api/www/artist/artistInfo',
    method: 'GET',
    params,
  }).then((res) => {
    const { artistList, total } = res.data.data
    return {
      list: artistList,
      total: Number(total),
    }
  })
}

// https://www.kuwo.cn/api/www/artist/artist?artistid=336&httpsStatus=1&reqId=e5ef0150-da78-11ed-9358-39ad5e03fffc
// 歌手详情
export function fetchArtistInfo(
  artistid: string | number
): Promise<ArtistInfo> {
  return request({
    url: '/api/www/artist/artist',
    method: 'GET',
    params: {
      artistid,
    },
  }).then((res) => res.data.data)
}

// https://www.kuwo.cn/api/www/artist/artistMusic?artistid=336&pn=1&rn=20&httpsStatus=1&reqId=f55d4670-da90-11ed-9358-39ad5e03fffc
// 歌手单曲
export function fetchArtistSongs(
  artistid: string | number,
  page?: Partial<PageParams>
): Promise<PageData<Music>> {
  const params = {
    artistid,
    pn: 1,
    rn: 20,
    ...page,
  }
  return request({
    url: '/api/www/artist/artistMusic',
    method: 'GET',
    params,
  }).then((res) => res.data.data)
}

// https://www.kuwo.cn/api/www/artist/artistAlbum?artistid=336&pn=1&rn=20&httpsStatus=1&reqId=f494c650-da90-11ed-9358-39ad5e03fffc
// 歌手专辑
export function fetchArtistAlbum(
  artistid: string | number,
  page?: Partial<PageParams>
): Promise<PageData<Album>> {
  const params = {
    artistid,
    pn: 1,
    rn: 20,
    ...page,
  }
  return request({
    url: '/api/www/artist/artistAlbum',
    method: 'GET',
    params,
  }).then((res) => {
    const { albumList, total } = res.data.data
    return {
      list: albumList,
      total: Number(total),
    }
  })
}

// https://www.kuwo.cn/api/www/artist/artistMv?artistid=336&pn=1&rn=20&httpsStatus=1&reqId=40d1c6c0-da97-11ed-9358-39ad5e03fffc
// 歌手
export function fetchArtistMv(
  artistid: string | number,
  page?: Partial<PageParams>
): Promise<PageData<Mv>> {
  const params = {
    artistid,
    pn: 1,
    rn: 20,
    ...page,
  }
  return request({
    url: '/api/www/artist/artistMv',
    method: 'GET',
    params,
  }).then((res) => {
    const { mvlist, total } = res.data.data
    return {
      list: mvlist,
      total: Number(total),
    }
  })
}
