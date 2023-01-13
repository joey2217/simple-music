import { describe, expect, test } from 'vitest'
import netcase from '../src/renderer/main/musicResource/netcase'

describe('测试网易云API', () => {
  test('fetchTopList result length > 0', async () => {
    const res = await netcase.fetchTopList()
    // console.log(res[0])
    expect(res.length).greaterThan(0)
  })
  test('fetchTopListDetail result not null', async () => {
    const id = 19723756
    const songListDetail = await netcase.fetchTopListDetail(id)
    expect(songListDetail).not.toBeNull()
  })
  // test('fetchSongListData result length > 0', async () => {
  //   const id = 2829733864
  //   const songs = await netcase.fetchSongListData([id])
  //   console.log(songs)
  //   expect(songs.length).greaterThan(0)
  // })
  test('fetchHotSearch not null', async () => {
    const res = await netcase.fetchHotSearch()
    console.log(res)
    expect(res).not.toBeNull()
  })
})
