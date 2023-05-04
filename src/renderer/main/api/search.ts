import request from './request'
import type { Album, Music, Mv, PageData, PageParams } from '../types'
import { SongListItem } from '../types/songList'
import { Artist } from '../types/artist'

//https://www.kuwo.cn/api/www/search/searchKey?key=&httpsStatus=1&reqId=e521c060-e567-11ed-8d12-1f55f65c5dc2

// 'RELWORD=416女团\r\nSNUM=2233\r\nRNUM=1000\r\nTYPE=0'
function handleKeyWord(str: string) {
  const arr = str.split('=')
  if (arr[1]) {
    const list = arr[1].split('\r\n')
    if (list[0]) {
      return list[0]
    }
  }
  return str
}

export function fetchSearchKeys(key: string = ''): Promise<string[]> {
  return request({
    url: '/api/www/search/searchKey',
    method: 'GET',
    params: {
      key,
    },
  }).then((res) => res.data.data.map(handleKeyWord))
}

// https://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key=可能+程响铃声3O钞&pn=1&rn=20&httpsStatus=1&reqId=
export function fetchSearchMusic(
  key: string,
  page?: Partial<PageParams>
): Promise<PageData<Music>> {
  const params = {
    key,
    pn: 1,
    rn: 20,
    ...page,
  }
  return request({
    url: '/api/www/search/searchMusicBykeyWord',
    method: 'GET',
    params,
  }).then((res) => {
    const { list, total } = res.data.data
    return {
      list,
      total: Number(total),
    }
  })
}
// http://www.kuwo.cn/api/www/search/searchAlbumBykeyWord?key=周杰伦&pn=1&rn=20&httpsStatus=1&reqId=3086a1f0-e5be-11ed-88f2-2d628fa5c53e
export function fetchSearchAlbum(
  key: string,
  page?: Partial<PageParams>
): Promise<PageData<Album>> {
  const params = {
    key,
    pn: 1,
    rn: 20,
    ...page,
  }
  return request({
    url: '/api/www/search/searchAlbumBykeyWord',
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
// http://www.kuwo.cn/api/www/search/searchMvBykeyWord?key=周杰伦&pn=1&rn=20&httpsStatus=1&reqId=b5359cd0-e5be-11ed-88f2-2d628fa5c53e
export function fetchSearchMV(
  key: string,
  page?: Partial<PageParams>
): Promise<PageData<Mv>> {
  const params = {
    key,
    pn: 1,
    rn: 20, 
    ...page,
  }
  return request({
    url: '/api/www/search/searchMvBykeyWord',
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
// http://www.kuwo.cn/api/www/search/searchPlayListBykeyWord?key=周杰伦&pn=1&rn=30&httpsStatus=1&reqId=190c3ca0-e5bf-11ed-88f2-2d628fa5c53e
export function fetchSearchSongList(
  key: string,
  page?: Partial<PageParams>
): Promise<PageData<SongListItem>> {
  const params = {
    key,
    pn: 1,
    rn: 20, 
    ...page,
  }
  return request({
    url: '/api/www/search/searchPlayListBykeyWord',
    method: 'GET',
    params,
  }).then((res) => {
    const { list, total } = res.data.data
    return {
      list,
      total: Number(total),
    }
  })
}
// http://www.kuwo.cn/api/www/search/searchArtistBykeyWord?key=周杰伦&pn=1&rn=30&httpsStatus=1&reqId=58593930-e5bf-11ed-88f2-2d628fa5c53e
export function fetchSearchArtist(
  key: string,
  page?: Partial<PageParams>
): Promise<PageData<Artist>> {
  const params = {
    key,
    pn: 1,
    rn: 30, 
    ...page,
  }
  return request({
    url: '/api/www/search/searchArtistBykeyWord',
    method: 'GET',
    params,
  }).then((res) => {
    const { list, total } = res.data.data
    return {
      list,
      total: Number(total),
    }
  })
}