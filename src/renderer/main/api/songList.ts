import { SongListData } from '../types'
import request, { reqId } from './request'

//https://www.kuwo.cn/api/www/bang/bang/musicList?bangId=93&pn=1&rn=30&httpsStatus=1&reqId=uuid
// 歌单
export function fetchSongList(
  bangId: string | number,
  pn = 1,
  rn = 30
): Promise<SongListData> {
  return request({
    url: '/api/www/bang/bang/musicList',
    method: 'GET',
    params: {
      bangId,
      pn,
      rn,
      httpsStatus: 1,
      reqId,
    },
  }).then((res) => res.data.data)
}
