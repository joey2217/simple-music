import request from './request'
import type { Album, PageParams } from '../types'

// https://www.kuwo.cn/api/www/album/albumInfo?albumId=3668654&pn=1&rn=20
export function fetchAlbum(
  albumId: string | number,
  page?: Partial<PageParams>
): Promise<Album> {
  const params = {
    albumId,
    pn: 1,
    rn: 20,
    ...page,
  }
  return request({
    url: '/api/www/album/albumInfo',
    method: 'GET',
    params,
  }).then((res) => res.data.data)
}
