import request from './request'
import type { PlaylistParams, Ranking, Tag } from '../types'
import type { SongListItem } from '../types/songList'

// https://www.kuwo.cn/api/www/playlist/index/tags?httpsStatus=1&reqId=66f7a781-d86b-11ed-9350-233184620aa6
// 推荐歌单tag
export function fetchPlayListTags(): Promise<Tag[]> {
  return request({
    url: '/api/www/playlist/index/tags',
    method: 'GET',
  }).then((res) => res.data.data)
}

// https://kuwo.cn/api/www/artist/index/tags?httpsStatus=1&reqId=e169d830-d8d4-11ed-8bc6-77b3761f7393
// 推荐歌手tag
export function fetchArtistTags(): Promise<Tag[]> {
  return request({
    url: '/api/www/artist/index/tags',
    method: 'GET',
  }).then((res) => res.data.data)
}

// https://kuwo.cn/api/www/bang/index/bangList?httpsStatus=1&reqId=e169d832-d8d4-11ed-8bc6-77b3761f7393
// 首页排行榜
export function fetchRankingList(): Promise<Ranking[]> {
  return request({
    url: '/api/www/bang/index/bangList',
    method: 'GET',
  }).then((res) => res.data.data)
}

const DEFAULT_PLAYLIST_QUERY_PARAMS: PlaylistParams = {
  id: 'rcm',
  pn: 1,
  rn: 5,
}

// https://kuwo.cn/api/www/rcm/index/playlist?id=rcm&pn=1&rn=5&httpsStatus=1&reqId=8ee71120-d912-11ed-ac12-bb9f0e25ff54
// 首页精选歌单
export function fetchIndexPlaylist(
  query?: Partial<PlaylistParams>
): Promise<SongListItem[]> {
  const params = {
    ...DEFAULT_PLAYLIST_QUERY_PARAMS,
    ...query,
  }
  return request({
    url: '/api/www/rcm/index/playlist',
    method: 'GET',
    params,
  }).then((res) => res.data.data.list)
}
