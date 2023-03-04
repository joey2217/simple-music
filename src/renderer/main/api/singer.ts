import request, { reqId } from './request'
import type { Singer, PageData, SingerDetail } from '../types'

// https://www.kuwo.cn/api/www/artist/artistInfo?category=0&prefix=&pn=1&rn=60&httpsStatus=1&reqId=e1e5dbf0-ba49-11ed-953c-4f110cfd0d36
// 歌手列表
export function fetchSingerList(
  category: string | number,
  prefix: string | number = '',
  pn = 1,
  rn = 60
): Promise<PageData<Singer>> {
  return request({
    url: '/api/www/artist/artistInfo',
    method: 'GET',
    params: {
      category,
      prefix,
      pn,
      rn,
      httpsStatus: 1,
      reqId,
    },
  }).then((res) => {
    const { total, artistList } = res.data.data
    return {
      list: artistList,
      total: Number(total),
    }
  })
}

// https://www.kuwo.cn/api/www/artist/artist?artistid=336&httpsStatus=1&reqId=e0222a90-ba57-11ed-953c-4f110cfd0d36
// 歌手详情
export function fetchSingerDetail(
  artistid: string | number
): Promise<SingerDetail> {
  return request({
    url: '/api/www/artist/artist',
    method: 'GET',
    params: {
      artistid,
      httpsStatus: 1,
      reqId,
    },
  }).then((res) => res.data.data)
}
