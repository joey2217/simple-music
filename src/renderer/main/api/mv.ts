import request from './request'
import type { PageParams, PageData, Mv } from '../types'

// https://www.kuwo.cn/api/www/music/mvList?pid=236682871&pn=1&rn=20&httpsStatus=1&reqId=e7408060-daa0-11ed-8f9e-4bb6bbe4d749
// mv列表
export function fetchMvList(
  pid = 236682871,
  page?: Partial<PageParams>
): Promise<PageData<Mv>> {
  const params = {
    pid,
    pn: 1,
    rn: 20,
    ...page,
  }
  return request({
    url: '/api/www/music/mvList',
    method: 'GET',
    params,
  }).then((res) => {
    const { mvlist, total } = res.data.data
    return {
      list: mvlist,
      total,
    }
  })
}

// https://www.kuwo.cn/api/v1/www/music/playUrl?mid=156755380&type=mv&httpsStatus=1&reqId=7e36ade0-e2a4-11ed-9160-a154eb80644b
// mv
export function fetchMvUrl(mid: string | number): Promise<string> {
  return request({
    url: '/api/v1/www/music/playUrl',
    method: 'GET',
    params: {
      mid,
      type: 'mv',
    },
  }).then((res) => res.data.data.url)
}
