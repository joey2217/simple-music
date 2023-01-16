import axios from 'axios'
import type {
  SearchParams,
  Song,
  SongListDetail,
  SongListItem,
  SongListParams,
} from './types'
import forge from 'node-forge'
import { getParameterByName } from './utils'

const HEADERS = {
  'content-type': 'application/x-www-form-urlencoded',
}

const neteaseRequest = axios.create({
  baseURL: import.meta.env.DEV ? '/netease' : 'https://music.163.com/weapi',
  headers: HEADERS,
})

function createSecretKey(size: number) {
  const result = []
  const choice = '012345679abcdef'.split('')
  for (let i = 0; i < size; i += 1) {
    const index = Math.floor(Math.random() * choice.length)
    result.push(choice[index])
  }
  return result.join('')
}

function aesEncrypt(text: string, sec_key: string, algo: any) {
  const cipher = forge.cipher.createCipher(algo, sec_key)
  cipher.start({ iv: '0102030405060708' })
  cipher.update(forge.util.createBuffer(text))
  cipher.finish()

  return cipher.output
}

function rsaEncrypt(text: string, pubKey: string, modulus: string) {
  text = text.split('').reverse().join('') // eslint-disable-line no-param-reassign
  const n = new forge.jsbn.BigInteger(modulus, 16)
  const e = new forge.jsbn.BigInteger(pubKey, 16)
  const b = new forge.jsbn.BigInteger(forge.util.bytesToHex(text), 16)
  const enc = b.modPow(e, n).toString(16).padStart(256, '0')
  return enc
}

function weapi(params: object) {
  const modulus =
    '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b72' +
    '5152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbd' +
    'a92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe48' +
    '75d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
  const nonce = '0CoJUm6Qyw8W8jud'
  const pubKey = '010001'
  const text = JSON.stringify(params)
  const sec_key = createSecretKey(16)
  const enc_text = btoa(
    aesEncrypt(
      btoa(aesEncrypt(text, nonce, 'AES-CBC').data),
      sec_key,
      'AES-CBC'
    ).data
  )
  const enc_sec_key = rsaEncrypt(sec_key, pubKey, modulus)
  const data = {
    params: enc_text,
    encSecKey: enc_sec_key,
  }

  return data
}

function eapi(url: string, object: string | object) {
  const eapiKey = 'e82ckenh8dichen8'

  const text = typeof object === 'object' ? JSON.stringify(object) : object
  const message = `nobody${url}use${text}md5forencrypt`
  const digest = forge.md5
    .create()
    .update(forge.util.encodeUtf8(message))
    .digest()
    .toHex()
  const data = `${url}-36cd479b6b5-${text}-36cd479b6b5-${digest}`

  return {
    params: aesEncrypt(data, eapiKey, 'AES-ECB').toHex().toUpperCase(),
  }
}

namespace netease {
  // 排行榜
  export function fetchTopList(): Promise<SongListItem[]> {
    return neteaseRequest({
      url: '/toplist',
      method: 'POST',
      data: weapi({}),
    }).then((res) =>
      res.data.list.map((item: any) => ({
        id: item.id,
        name: item.name,
        coverImgUrl: item.coverImgUrl,
        description: item.description,
        sourceUrl: item.id,
      }))
    )
  }

  export function fetchSongListDetail(
    id: string | number
  ): Promise<SongListDetail> {
    return neteaseRequest({
      url: '/v3/playlist/detail',
      method: 'POST',
      data: weapi({
        id,
        n: 100000,
        p: 1,
      }),
    }).then((res) => {
      const { playlist } = res.data
      return {
        id: playlist.id,
        name: playlist.name,
        coverImgUrl: playlist.coverImgUrl,
        description: playlist.description,
        tracks: playlist.tracks.map((t: any) => ({
          id: t.id,
          name: t.name,
          artist: t.ar,
          album: t.al,
        })),
        trackIds: playlist.trackIds.map((t: any) => t.id),
      }
    })
  }

  // 歌单
  export function fetchSongList(
    params: Partial<SongListParams> = {}
  ): Promise<SongListItem[]> {
    if (params.filter === 'topList') {
      return fetchTopList()
    }
    let limit: number | undefined
    if (params.offset != null) {
      limit = 35
    }
    return neteaseRequest({
      url: '/playlist/',
      method: 'GET',
      params: {
        cat: params.filter,
        order: 'hot',
        limit,
        offset: params.offset,
      },
    }).then((response) => {
      const { data } = response
      const list_elements = Array.from(
        new DOMParser()
          .parseFromString(data, 'text/html')
          .getElementsByClassName('m-cvrlst')[0].children
      )
      const result = list_elements.map((item) => ({
        coverImgUrl: item
          .getElementsByTagName('img')[0]
          .src.replace('140y140', '512y512'),
        name: item.getElementsByTagName('div')[0].getElementsByTagName('a')[0]
          .title,
        id: `${getParameterByName(
          'id',
          item.getElementsByTagName('div')[0].getElementsByTagName('a')[0].href
        )}`,
        description: '',
        sourceUrl: `https://music.163.com/#/playlist?id=${getParameterByName(
          'id',
          item.getElementsByTagName('div')[0].getElementsByTagName('a')[0].href
        )}`,
      }))
      return result
    })
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

  export function fetchHotSearch(): Promise<string[]> {
    return neteaseRequest({
      url: '/search/hot',
      method: 'POST',
      headers: {
        // 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
        origin: 'https://music.163.com',
      },
      data: weapi({ type: 1111 }),
    }).then((res) => {
      const { code } = res.data
      if (code === 200) {
        return res.data.result.hots.map((h: { first: string }) => h.first)
      }
      throw new Error('请求失败')
    })
  }

  export function fetchSearchResult(
    params: Partial<SearchParams> = {
      page: 1,
      type: 1,
    }
  ) {
    const page = params.page || 1
    return neteaseRequest({
      baseURL: import.meta.env.DEV ? '/api163' : 'https://music.163.com/api',
      url: '/search/pc',
      method: 'POST',
      params: {
        s: params.keyword,
        offset: 20 * (page - 1),
        limit: 20,
        type: params.type,
      },
    }).then((res) => res.data)
  }
}

export default netease
