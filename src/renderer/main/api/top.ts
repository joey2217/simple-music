import type { AxiosError } from 'axios'
import request, { reqId } from './request'
import type { BoardItem, SongListItem } from '../types'

let retry = 0
const MAX_RETRY_COUNT = 3

// 'RELWORD=416女团\r\nSNUM=2233\r\nRNUM=1000\r\nTYPE=0'
function handleKeyWord(str: string) {
  const arr = str.split('=')
  if (arr[1]) {
    const list = arr[1].split('\r\n')
    if (list[0]) {
      return list[0]
    }
  }
  return str
}

// https://www.kuwo.cn/api/www/search/searchKey?key=&httpsStatus=1&reqId=1e3d79e0-96f6-11ed-a3b3-cde83c86f5a8
export function fetchSearchKey(key: string = ''): Promise<string[]> {
  return new Promise((resolve, reject) => {
    request({
      url: '/api/www/search/searchKey',
      method: 'GET',
      params: {
        key,
        httpsStatus: 1,
        reqId,
      },
    })
      .then((res) => {
        const { code, data } = res.data
        if (code === 200) {
          const list = data.map(handleKeyWord)
          resolve(list)
        } else {
          reject(res.data)
        }
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 403) {
          retry += 1
          if (retry < MAX_RETRY_COUNT) {
            fetchSearchKey()
          } else {
            reject(err)
          }
        }
        reject(err)
      })
  })
}

export function fetchBoards(): Promise<BoardItem[]> {
  return request({
    url: 'https://qukudata.kuwo.cn/q.k?op=query&cont=tree&node=2&pn=0&rn=1000&fmt=json&level=2',
    method: 'GET',
  }).then((res) => {
    return res.data.child
  })
}

export function fetchSearchData(
  key: string,
  pn = 1,
  rn = 30
): Promise<{ list: SongListItem[]; total: number }> {
  return request({
    url: '/api/www/search/searchMusicBykeyWord',
    method: 'GET',
    params: {
      key,
      pn,
      rn,
      httpsStatus: 1,
      reqId,
    },
  }).then((res) => {
    const { list, total } = res.data.data
    return {
      list,
      total: Number(total),
    }
  })
}
