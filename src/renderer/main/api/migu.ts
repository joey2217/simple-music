import type { MiguResponse, SearchData, SongInfo } from '../types/migu'

//搜索
export function fetchSearchData(keyword: string, page: number = 1) {
  if (keyword === '') {
    throw new Error('搜索关键字不能为空')
  }
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
export function fetchSongInfo(copyrightId: string) {
  return fetch(
    `https://m.music.migu.cn/migumusic/h5/play/auth/getSongPlayInfo?copyrightId=${copyrightId}&type=1`,
    {
      cache: 'force-cache',
    }
  )
    .then((res) => res.json())
    .then((data: MiguResponse<SongInfo>) => {
      if (data.code === '200') {
        return data.data
      }
      throw new Error(data.msg)
    })
}
