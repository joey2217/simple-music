import request from './request'
import type {
  SongListItem,
  SongListTag,
  SongListDetail,
} from '../types/songList'
import type { PageData, PageParams } from '../types'

// https://www.kuwo.cn/api/www/playlist/getTagList?httpsStatus=1&reqId=9c5665c0-da9a-11ed-abf1-d7607743e16a
// 歌单tag
export function fetchSongListTags(): Promise<SongListTag[]> {
  return request({
    url: '/api/www/playlist/getTagList',
    method: 'GET',
  }).then((res) => res.data.data)
}

// https://kuwo.cn/api/www/classify/playlist/getTagPlayList?id=1848&pn=1&rn=5&httpsStatus=1&reqId=8b600d40-d912-11ed-ac12-bb9f0e25ff54
// tag歌单
export function fetchTagPlaylist(
  id: string | number,
  page?: Partial<PageParams>
): Promise<PageData<SongListItem>> {
  const params = {
    id,
    pn: 1,
    rn: 20,
    ...page,
  }
  return request({
    url: '/api/www/classify/playlist/getTagPlayList',
    method: 'GET',
    params,
  }).then((res) => {
    const { data, total } = res.data.data
    return {
      list: data,
      total,
    }
  })
}

// https://www.kuwo.cn/api/www/classify/playlist/getRcmPlayList?pn=1&rn=20&order=new&httpsStatus=1&reqId=f17cec10-da9d-11ed-abf1-d7607743e16a
// 精选歌单
export function fetchRcmPlaylist(
  order: string,
  page?: Partial<PageParams>
): Promise<PageData<SongListItem>> {
  const params = {
    order,
    pn: 1,
    rn: 20,
    ...page,
  }
  return request({
    url: '/api/www/classify/playlist/getRcmPlayList',
    method: 'GET',
    params,
  }).then((res) => {
    const { data, total } = res.data.data
    return {
      list: data,
      total,
    }
  })
}

// https://www.kuwo.cn/api/www/playlist/playListInfo?pid=3449722708&pn=1&rn=20&httpsStatus=1&reqId=
// 歌单详情
export function fetchSongListDetail(
  pid: string | number,
  page?: Partial<PageParams>
): Promise<SongListDetail> {
  const params = {
    pid,
    pn: 1,
    rn: 20,
    ...page,
  }
  return request({
    url: '/api/www/playlist/playListInfo',
    method: 'GET',
    params,
  }).then((res) => res.data.data)
}
