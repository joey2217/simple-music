import axios from 'axios'
import { reqId } from './request'
import type { Lyric } from '../types'

// https://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=39576231

export function fetchLyric(musicId: string | number): Promise<Lyric[]> {
  return axios({
    url: 'https://m.kuwo.cn/newh5/singles/songinfoandlrc',
    method: 'GET',
    params: {
      musicId,
      httpsStatus: 1,
      reqId,
    },
    // headers: {
    //   origin: 'https://www.kuwo.cn/',
    //   Referer: 'https://www.kuwo.cn/',
    //   host: 'https://www.kuwo.cn/',
    // },
  }).then((res) => {
    const { lrclist } = res.data.data
    return lrclist.map((item: { time: string }) => ({
      ...item,
      time: Number(item.time),
    }))
  })
}
