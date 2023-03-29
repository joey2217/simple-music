import { MusicInfo } from '../types'
import request, { reqId } from './request'

// https://www.kuwo.cn/api/v1/www/music/playUrl?mid=258397557&type=music&httpsStatus=1&reqId=uuid
export function fetchMusicUrl2(mid: string | number): Promise<string> {
  return request({
    url: '/api/v1/www/music/playUrl',
    method: 'GET',
    params: {
      mid,
      type: 'music',
      httpsStatus: 1,
      reqId,
    },
  }).then((res) => res.data.data.url)
}
// https://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3&response=url&rid=228491562
// const target_url = `http://www.kuwo.cn/api/v1/www/music/playUrl?mid=${song_id}&type=convert_url3&br=128kmp3`;
export function fetchMusicUrl(mid: string | number): Promise<string> {
  return request({
    url: 'http://www.kuwo.cn/api/v1/www/music/playUrl',
    method: 'GET',
    params: {
      mid,
      type: 'convert_url3',
      br: 'br=128kmp3'
    },
  }).then((res) => res.data)
}

// https://www.kuwo.cn/api/www/music/musicInfo?mid=215529453&httpsStatus=1&reqId=uuid
export function fetchMusicInfoData(mid: string | number): Promise<MusicInfo> {
  return request({
    url: '/api/www/music/musicInfo',
    method: 'GET',
    params: {
      mid,
      httpsStatus: 1,
      reqId,
    },
  }).then((res) => res.data.data)
}

export async function fetchMusicInfo(mid: string | number): Promise<MusicInfo> {
  const info = await fetchMusicInfoData(mid)
  const url = await fetchMusicUrl(mid)
  return {
    ...info,
    url,
  }
}
