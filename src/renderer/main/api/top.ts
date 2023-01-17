import axios from 'axios'

// 排行榜
const BOARD_LIST = [
  { name: '尖叫新歌榜', boardId: '27553319', webId: 'jianjiao_newsong' },
  { name: '尖叫热歌榜', boardId: '27186466', webId: 'jianjiao_hotsong' },
  { name: '尖叫原创榜', boardId: '27553408', webId: 'jianjiao_original' },
  { name: '音乐榜', boardId: 'migumusic', webId: 'migumusic' },
  { name: '影视榜', boardId: 'movies', webId: 'movies' },
  { name: '港台榜', boardId: '23189800', webId: 'hktw' },
  { name: '内地榜', boardId: '23189399', webId: 'mainland' },
  { name: '欧美榜', boardId: '19190036', webId: 'eur_usa' },
  { name: '日韩榜', boardId: '23189813', webId: 'jpn_kor' },
  { name: '彩铃榜', boardId: '23190126', webId: 'coloring' },
  { name: 'KTV榜', boardId: '15140045', webId: 'ktv' },
  { name: '网络榜', boardId: '15140034', webId: 'network' },
  { name: 'MV榜', boardId: '23217754', webId: 'mv' },
  { name: '新专辑榜', boardId: '23218151', webId: 'newalbum' },
  { name: '美国iTunes榜', boardId: '21958042', webId: 'itunes' },
  { name: '美国billboard榜', boardId: '21975570', webId: 'billboard' },
  { name: '台湾Hito中文榜', boardId: '22272815', webId: 'hito' },
  { name: '中国TOP排行榜', boardId: '22272904' },
  { name: '韩国Melon榜', boardId: '22272943', webId: 'mnet' },
  { name: '英国UK榜', boardId: '22273437', webId: 'uk' },
]

const BASE_URL = 'https://app.c.nf.migu.cn/'

export function fetchBoardData(boardId: string): Promise<any[]> {
  return axios({
    baseURL: BASE_URL,
    url: 'MIGUM2.0/v1.0/content/querycontentbyId.do',
    method: 'GET',
    params: {
      columnId: boardId,
      needAll: 0,
    },
  }).then((res) => {
    console.log(res.data)
    return res.data
  })
}
