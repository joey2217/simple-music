import type { AxiosError } from 'axios'
import { v4 as uuidv4 } from 'uuid'
import request from './request'
import type { BoardItem } from '../types'

let retry = 0
const MAX_RETRY_COUNT = 3

// https://www.kuwo.cn/api/www/search/searchKey?key=&httpsStatus=1&reqId=1e3d79e0-96f6-11ed-a3b3-cde83c86f5a8
export function fetchSearchKey(key:string = ''): Promise<string[]> {
  return new Promise((resolve, reject) => {
    request({
      url: '/api/www/search/searchKey',
      method: 'GET',
      params: {
        key,
        httpsStatus: 1,
        reqId: uuidv4(),
      },
    })
      .then((res) => {
        const { code, data } = res.data
        if (code === 200) {
          resolve(data)
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

export function fetchBoards():Promise<BoardItem[]> {
  return request({
    url: 'https://qukudata.kuwo.cn/q.k?op=query&cont=tree&node=2&pn=0&rn=1000&fmt=json&level=2',
    method: 'GET',
  }).then((res) => {
    return res.data.child
  })
}
