import { JSONParse } from "../utils"

const timestamp = Date.now().toString()
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0'

// 搜索song
// https://complexsearch.kugou.com/v2/search/song?callback=callback123&srcappid=2919&clientver=1000&clienttime=1706773384012&mid=8251489646aca8b52667befd50d27d09&uuid=8251489646aca8b52667befd50d27d09&dfid=0R7jTy1OMxAQ42avNH3z5x9Z&keyword=%E5%91%A8%E6%9D%B0%E4%BC%A6&page=1&pagesize=30&bitrate=0&isfuzzy=0&inputtype=0&platform=WebFilter&userid=0&iscorrection=1&privilege_filter=0&filter=10&token=&appid=1014&signature=dcda844a1c01795b4df19eda0c6d399e
export function fetchSearchSong(keyword: string, page: number = 1) {
  const params = {
    callback: 'callback123',
    srcappid: '2919',
    clientver: '1000',
    clienttime: timestamp,
    mid: '8251489646aca8b52667befd50d27d09',
    uuid: '8251489646aca8b52667befd50d27d09',
    dfid: '0R7jTy1OMxAQ42avNH3z5x9Z',
    keyword,
    page: page.toString(),
    pagesize: '30',
    bitrate: '0',
    isfuzzy: '0',
    inputtype: '0',
    platform: 'WebFilter',
    userid: '0',
    iscorrection: '1',
    privilege_filter: '0',
    filter: '10',
    token: '',
    appid: '1014',
    signature: 'dcda844a1c01795b4df19eda0c6d399e',
  }
  const reg = new RegExp(params.callback + '\\((.+)\\)')
  const searchParams = new URLSearchParams(params)
  return fetch(
    `https://complexsearch.kugou.com/v2/search/song?${searchParams.toString()}`,
    {
      headers: {
        accept: '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'sec-ch-ua':
          '"Not A(Brand";v="99", "Microsoft Edge";v="121", "Chromium";v="121"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-site',
        'User-Agent': UA,
      },
      referrer: 'https://www.kugou.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }
  ).then(res=>res.text()).then(text=>{
    const json = text.replace(reg, (m, p1) => p1)
    const data = JSONParse(json)
    console.log(data)
    return data
  })
}

// 搜索TIP
// https://searchtip.kugou.com/getSearchTip?MusicTipCount=5&MVTipCount=2&albumcount=2&keyword=%E5%91%A8%E6%9D%B0%E4%BC%A6&callback=jQuery19108576235094741187_1706771238267&_=1706771238269
export function fetchSearchTip(keyword: string) {
  const search = {
    MusicTipCount: '5',
    MVTipCount: '2',
    albumcount: '2',
    keyword,
    _: timestamp,
  }
  const searchParams = new URLSearchParams(search)
  return fetch(
    `https://searchtip.kugou.com/getSearchTip?${searchParams.toString()}`,
    {
      headers: {
        accept: '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'sec-ch-ua':
          '"Not A(Brand";v="99", "Microsoft Edge";v="121", "Chromium";v="121"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-site',
        'User-Agent': UA,
      },
      referrer: 'https://www.kugou.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err, 'search error')
    })
}
