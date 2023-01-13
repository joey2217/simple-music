import axios from 'axios'
import type { ImgType, ListType, PlayListParams, TopListItem } from './types'

namespace qq {
  function htmlDecode(value: string) {
    const parser = new DOMParser()
    return parser.parseFromString(value, 'text/html').body.textContent
  }

  const TOP_LIST_URL =
    'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&uin=0&needNewCode=1&platform=h5'

  export function fetchTopList(): Promise<TopListItem[]> {
    return axios.get(TOP_LIST_URL).then((response) => {
      return response.data.data.topList.map(
        (item: { picUrl: any; id: any; topTitle: any }) => {
          return {
            coverImgUrl: item.picUrl,
            id: `qqtoplist_${item.id}`,
            sourceUrl: `https://y.qq.com/n/yqq/toplist/${item.id}.html`,
            title: item.topTitle,
          }
        }
      )
    })
  }

  export function fetchPlayList(
    params: Partial<PlayListParams> = {}
  ): Promise<TopListItem[]> {
    const offset = params.offset || 0
    let filterId = params.filterId || ''
    if (filterId === 'topList') {
      return fetchTopList()
    }
    if (filterId === '') {
      filterId = '10000000'
    }

    const target_url =
      'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' +
      `?picmid=1&rnd=${Math.random()}&g_tk=732560869` +
      '&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8' +
      '&notice=0&platform=yqq.json&needNewCode=0' +
      `&categoryId=${filterId}&sortId=5&sin=${offset}&ein=${29 + offset}`

    return axios.get(target_url).then((response) => {
      // console.log(target_url, response.data)
      return response.data.data.list.map(
        (item: { imgurl: any; dissname: any; dissid: any }) => ({
          coverImgUrl: item.imgurl,
          title: htmlDecode(item.dissname),
          id: `qqplaylist_${item.dissid}`,
          sourceUrl: `https://y.qq.com/n/ryqq/playlist/${item.dissid}`,
        })
      )
    })
  }

  export function getImageUrl(imgId: string, imgType: ImgType) {
    if (imgId == null) {
      return ''
    }
    let category = ''
    if (imgType === 'artist') {
      category = 'T001R300x300M000'
    }
    if (imgType === 'album') {
      category = 'T002R300x300M000'
    }
    const s = category + imgId
    const url = `https://y.gtimg.cn/music/photo_new/${s}.jpg`
    return url
  }

  export function isPlayable(song: {
    switch: { toString: (arg0: number) => string }
  }) {
    const switch_flag = song.switch.toString(2).split('')
    switch_flag.pop()
    switch_flag.reverse()
    // flag switch table meaning:
    // ["play_lq", "play_hq", "play_sq", "down_lq", "down_hq", "down_sq", "soso",
    //  "fav", "share", "bgm", "ring", "sing", "radio", "try", "give"]
    const play_flag = switch_flag[0]
    const try_flag = switch_flag[13]
    return play_flag === '1' || (play_flag === '1' && try_flag === '1')
  }

  // TODO type
  export function convertSong2(song: any) {
    const d = {
      id: `qqtrack_${song.songmid}`,
      title: htmlDecode(song.songname),
      artist: htmlDecode(song.singer[0].name),
      artist_id: `qqartist_${song.singer[0].mid}`,
      album: htmlDecode(song.albumname),
      album_id: `qqalbum_${song.albummid}`,
      img_url: getImageUrl(song.albummid, 'album'),
      source: 'qq',
      source_url: `https://y.qq.com/#type=song&mid=${song.songmid}&tpl=yqq_song_detail`,
      // url: `qqtrack_${song.songmid}`,
      url: !isPlayable(song) ? '' : undefined,
    }
    return d
  }

  export function convertSong(song: any) {
    const d = {
      id: `qqtrack_${song.mid}`,
      title: htmlDecode(song.name),
      artist: htmlDecode(song.singer[0].name),
      artist_id: `qqartist_${song.singer[0].mid}`,
      album: htmlDecode(song.album.name),
      album_id: `qqalbum_${song.album.mid}`,
      img_url: getImageUrl(song.album.mid, 'album'),
      source: 'qq',
      source_url: `https://y.qq.com/#type=song&mid=${song.mid}&tpl=yqq_song_detail`,
      url: '',
    }
    return d
  }

  export function getTopListUrl(
    id: number | string,
    period: string,
    limit: number
  ) {
    return `https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&inCharset=utf8&outCharset=utf-8&platform=yqq.json&needNewCode=0&data=${encodeURIComponent(
      JSON.stringify({
        comm: {
          cv: 1602,
          ct: 20,
        },
        toplist: {
          module: 'musicToplist.ToplistInfoServer',
          method: 'GetDetail',
          param: {
            topid: id,
            num: limit,
            period,
          },
        },
      })
    )}`
  }

  export function getPeriods(topId: string) {
    const periodUrl = 'https://c.y.qq.com/node/pc/wk_v15/top.html'
    const regExps = {
      periodList:
        /<i class="play_cover__btn c_tx_link js_icon_play" data-listkey=".+?" data-listname=".+?" data-tid=".+?" data-date=".+?" .+?<\/i>/g,
      period:
        /data-listname="(.+?)" data-tid=".*?\/(.+?)" data-date="(.+?)" .+?<\/i>/,
    }
    const periods: any = {}
    return axios.get(periodUrl).then((response) => {
      const html = response.data
      const pl = html.match(regExps.periodList)
      if (!pl) return Promise.reject()
      pl.forEach((p: string) => {
        const pr = p.match(regExps.period)
        if (!pr) return
        periods[pr[2]] = {
          name: pr[1],
          id: pr[2],
          period: pr[3],
        }
      })
      const info = periods[topId]
      return info && info.period
    })
  }

  export function getTopList(listType: ListType) {
    // special thanks to lx-music-desktop solution
    // https://github.com/lyswhut/lx-music-desktop/blob/24521bf50d80512a44048596639052e3194b2bf1/src/renderer/utils/music/tx/leaderboard.js
    return getPeriods(listType).then((listPeriod) => {
      const limit = 100
      const target_url = getTopListUrl(listType, listPeriod, limit)

      return axios.get(target_url).then((response) => {
        console.log(target_url)
        const { data } = response
        const tracks = data.toplist.data.songInfoList.map((song: any) => {
          const d = {
            id: `qqtrack_${song.mid}`,
            title: htmlDecode(song.name),
            artist: htmlDecode(song.singer[0].name),
            artist_id: `qqartist_${song.singer[0].mid}`,
            album: htmlDecode(song.album.name),
            album_id: `qqalbum_${song.album.mid}`,
            img_url: getImageUrl(song.album.mid, 'album'),
            source: 'qq',
            source_url: `https://y.qq.com/#type=song&mid=${song.mid}&tpl=yqq_song_detail`,
          }
          return d
        })
        const info = {
          cover_img_url: data.toplist.data.data.frontPicUrl,
          title: data.toplist.data.data.title,
          id: `qqtoplist_${listType}`,
          source_url: `https://y.qq.com/n/yqq/toplist/${listType}.html`,
        }
        return {
          tracks,
          info,
        }
      })
    })
  }

  export function getPlayList() {
    const listType: ListType = 'playList'
    // eslint-disable-line no-unused-vars
    const target_url =
      'https://i.y.qq.com/qzone-music/fcg-bin/fcg_ucc_getcdinfo_' +
      'byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0' +
      `&nosign=1&disstid=${listType}&g_tk=5381&loginUin=0&hostUin=0` +
      '&format=json&inCharset=GB2312&outCharset=utf-8&notice=0' +
      '&platform=yqq&needNewCode=0'
    return axios.get(target_url).then((response) => {
      // console.log(target_url, response.data);
      
      const { data } = response

      const info = {
        cover_img_url: data.cdlist[0].logo,
        title: data.cdlist[0].dissname,
        id: `qqplaylist_${listType}`,
        source_url: `https://y.qq.com/n/ryqq/playlist/${listType}`,
      }

      const tracks = data.cdlist[0].songlist.map((item: any) =>
        convertSong(item)
      )
      return {
        tracks,
        info,
      }
    })
  }
}

export default qq
