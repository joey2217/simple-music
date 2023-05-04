import request from './request'
import type { RankingListData, RankingMenu } from '../types/ranking'

// https://kuwo.cn/api/www/bang/bang/bangMenu?httpsStatus=1&reqId=a8ff2d80-d99a-11ed-b1b2-c93e7367cbc4
// 排行榜菜单
export function fetchRankingMenu(): Promise<RankingMenu[]> {
  return request({
    url: '/api/www/bang/bang/bangMenu',
    method: 'GET',
  }).then((res) => res.data.data)
}

// https://kuwo.cn/api/www/bang/bang/musicList?bangId=17&pn=1&rn=20&httpsStatus=1&reqId=c4ab0680-d9a4-11ed-b1b2-c93e7367cbc4
// 排行榜数据
export function fetchRankingList(
  bangId: number | string,
  pn = 1,
  rn = 20
): Promise<RankingListData> {
  return request({
    url: '/api/www/bang/bang/musicList',
    method: 'GET',
    params: {
      bangId,
      pn,
      rn,
    },
  }).then((res) => res.data.data)
}
