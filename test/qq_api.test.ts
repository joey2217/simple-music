import { describe, expect, test } from 'vitest'

import qq from '../src/renderer/main/musicResource/qq'

describe('测试QQAPI', () => {
  test('fetchTopList result not null', async () => {
    const res = await qq.fetchTopList('topList')
    // console.log(res)
    expect(res.length).greaterThan(0)
  })

//   test('fetchPlayList response number > 0' ,async () => {
//     const res = await fetchPlayList()
//     console.log(res)
//     expect(res.length).greaterThan(0)
//   })

//   test('fetchPlayList response number > 0' ,async () => {
//     const res = await qq.getPlayList()
//     console.log(res)
//     expect(res.tracks.length).greaterThan(0)
//   })
})
