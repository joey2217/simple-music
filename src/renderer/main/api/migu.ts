import type { MiguResponse, SearchData } from '../types/migu'

//搜索
export function fetchSearchData(keyword: string, page: number = 1) {
  return fetch(
    `https://m.music.migu.cn/migumusic/h5/search/all?text=${keyword}&pageNo=${page}&pageSize=20`
  )
    .then((res) => res.json())
    .then((data: MiguResponse<SearchData>) => {
      if (data.code === '200') {
        return data.data
      }
      throw new Error(data.msg)
    })
}

// 歌曲详情
export function fetchSongInfo() {
  return fetch(
    'https://m.music.migu.cn/migumusic/h5/play/auth/getSongPlayInfo?copyrightId=60054701920&type=1'
  )
}
