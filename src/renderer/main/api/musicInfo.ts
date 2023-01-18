import { v4 as uuidv4 } from 'uuid'
import { MusicInfo } from '../types'
import request from './request'

// https://www.kuwo.cn/api/v1/www/music/playUrl?mid=258397557&type=music&httpsStatus=1&reqId=uuid
export function fetchMusicUrl(mid: string | number): Promise<string> {
  return request({
    url: '/api/v1/www/music/playUrl',
    method: 'GET',
    params: {
      mid,
      type: 'music',
      httpsStatus: 1,
      reqId: uuidv4(),
    },
  }).then((res) => res.data.data.url)
}

// https://www.kuwo.cn/api/www/music/musicInfo?mid=215529453&httpsStatus=1&reqId=uuid
export function fetchMusicInfoData(mid: string | number): Promise<MusicInfo> {
  return request({
    url: '/api/www/music/musicInfo',
    method: 'GET',
    params: {
      mid,
      httpsStatus: 1,
      reqId: uuidv4(),
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
