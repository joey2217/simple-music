import axios from 'axios'
import type { Song, SongListDetail, SongListItem } from './types'
import { weapi } from './utils/crypto'

const neteaseRequest = axios.create({
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
})

namespace netease {
  // 排行榜
  export function fetchTopList(): Promise<SongListItem[]> {
    return neteaseRequest({
      url: 'https://music.163.com/weapi/toplist',
      method: 'POST',
      data: weapi({}),
    }).then((res) => res.data.list)
  }

  export function fetchTopListDetail(
    id: string | number
  ): Promise<SongListDetail> {
    return neteaseRequest({
      url: 'https://music.163.com/weapi/v3/playlist/detail',
      method: 'POST',
      data: weapi({
        id,
        n: 100000,
        p: 1,
      }),
    }).then((res) => res.data.playlist)
  }

  export function fetchSongListData(ids: (string | number)[]): Promise<Song[]> {
    return neteaseRequest({
      url: 'https://music.163.com/weapi/v3/song/detail',
      method: 'POST',
      headers: {
        // 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
        origin: 'https://music.163.com',
      },
      data: weapi({
        c: '[' + ids.map((id) => '{"id":' + id + '}').join(',') + ']',
        ids: '[' + ids.join(',') + ']',
      }),
    }).then((res) => {
      console.log(res.data)
      return res.data.songs
    })
  }

  export function fetchHotSearch() {
    return neteaseRequest({
      url: 'https://music.163.com/weapi/search/hot',
      method: 'POST',
      headers: {
        // 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
        origin: 'https://music.163.com',
      },
      data: weapi({ type: 1111 }),
    }).then(res=>res.data)
  }
}

export default netease
