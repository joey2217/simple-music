import type {
  ArtistInfo,
  ArtistPageData,
  ArtistRes,
  BannerItem,
  MiguResponse,
  PageData,
  PlayListItem,
  RankingListData,
  SearchData,
  SongInfo,
} from '../types/migu'

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

// const songInfoCache = new Map<string, SongInfo>()

// 歌曲详情
export function fetchSongInfo(copyrightId: string) {
  // if (songInfoCache.has(copyrightId)) {
  //   return Promise.resolve(songInfoCache.get(copyrightId)!)
  // }
  return fetch(
    `https://m.music.migu.cn/migumusic/h5/play/auth/getSongPlayInfo?copyrightId=${copyrightId}&type=2`,
    {
      cache: 'force-cache',
    }
  )
    .then((res) => res.json())
    .then((data: MiguResponse<SongInfo>) => {
      if (data.code === '200') {
        // songInfoCache.set(copyrightId, data.data)
        const songInfo = data.data
        if (songInfo.playUrl.startsWith('//')) {
          songInfo.playUrl = 'http:' + songInfo.playUrl
        }
        return songInfo
      }
      throw new Error(data.msg)
    })
}

// 排行榜 "https://app.c.nf.migu.cn/MIGUM3.0/v1.0/content/querycontentbyId.do?needAll=0&columnId=27553319"
export function fetchRankingList(columnId: string) {
  return fetch(
    `https://app.c.nf.migu.cn/MIGUM3.0/v1.0/content/querycontentbyId.do?needAll=0&columnId=${columnId}`
  )
    .then((res) => res.json())
    .then((data: RankingListData) => {
      if (data.code === '000000') {
        return data.columnInfo
      }
      throw new Error(data.info)
    })
}

//  `https://app.c.nf.migu.cn/MIGUM3.0/bmw/singer-index/list/v1.0?templateVersion=3&tab=${e}-${t}`,
export function fetchArtistList(type: string, area: string) {
  return fetch(
    `https://app.c.nf.migu.cn/MIGUM3.0/bmw/singer-index/list/v1.0?templateVersion=3&tab=${area}-${type}`,
    {
      cache: 'force-cache',
    }
  )
    .then((res) => res.json())
    .then((data: ArtistRes) => {
      if (data.code === '000000') {
        return data.data.contents
      }
      throw new Error(data.info)
    })
}

// `https://m.music.migu.cn/migumusic/h5/singer/getSingerDetail?singerId=${e}`
export function fetchArtistDetail(singerId: string) {
  return fetch(
    `https://m.music.migu.cn/migumusic/h5/singer/getSingerDetail?singerId=${singerId}`,
    {
      cache: 'force-cache',
    }
  )
    .then((res) => res.json())
    .then((data: MiguResponse<ArtistInfo>) => {
      if (data.code === '200') {
        return data.data
      }
      throw new Error(data.msg)
    })
}

//`https://m.music.migu.cn/migumusic/h5/singer/getSingerSAM?singerId=${e}&pageNo=${t}&pageSize=${n}&sam=${o}`,
export function fetchArtistSong(
  singerId: string,
  pageNo = 1,
  sam = '100', // 歌曲/专辑/MV
  pageSize = 30
) {
  return fetch(
    `https://m.music.migu.cn/migumusic/h5/singer/getSingerSAM?singerId=${singerId}&pageNo=${pageNo}&pageSize=${pageSize}&sam=${sam}`
  )
    .then((res) => res.json())
    .then((data: MiguResponse<ArtistPageData>) => {
      if (data.code === '200') {
        return data.data
      }
      throw new Error(data.msg)
    })
}

export function fetchBanner() {
  return fetch('https://m.music.migu.cn/migumusic/h5/home/banner')
    .then((res) => res.json())
    .then((data: MiguResponse<BannerItem[]>) => {
      if (data.code === '200') {
        return data.data.map((d) => ({
          ...d,
          url: d.url.replace('/v4/music', ''),
        }))
      }
      throw new Error(data.msg)
    })
}

// 歌单
//  (e, t, n) => `https://m.music.migu.cn/migumusic/h5/playlist/list?columnId=15127272&tagId=${e}&pageNum=${t}&pageSize=${n}
// https://m.music.migu.cn/migumusic/h5/playlist/list?columnId=15127272&tagId=1000001683&pageNum=1&pageSize=30
export function fetchPlaylist(tagId: string, page = 1, size = 30) {
  return fetch(
    `https://m.music.migu.cn/migumusic/h5/playlist/list?columnId=15127272&tagId=${tagId}&pageNum=${page}&pageSize=${size}`
  )
    .then((res) => res.json())
    .then((data: MiguResponse<PageData<PlayListItem>>) => {
      if (data.code === '200') {
        return data.data
      }
      throw new Error(data.msg)
    })
}
