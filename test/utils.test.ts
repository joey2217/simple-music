// sum.test.js
import { expect, test, describe } from 'vitest'
import { shuffle } from '../src/main/utils/index'

describe('洗牌算法测试', () => {
  test('测试洗牌算法', () => {
    const list = Array.from({ length: 10 }, (_, i) => i + 1)
    const s = shuffle(list)
    console.log(s)
    expect(s).not.toEqual(list)
  })
})

describe('fetch', () => {
  test('todayRecommendList',async () => {
   const res = await fetch("https://app.c.nf.migu.cn/pc/v1.0/template/todayRecommendList/release?actionId=1&index=1&templateVersion=5", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "cache-control": "max-age=0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "cross-site",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "migu-device-uuid=4BCA6359-0379-43DC-9F7E-7E6CA19AFA4B; mgAppH5CookieId=4184298716-25fxi035aa3bb951b580efed1ef44f-1752550488; idmpauth=true@passport.migu.cn; pacmtoken=C9948B8C93A8A48C699288A58C8093729A98868F93A4AB8A66948B9F807AA07A97938B8D95A4A6905E928CA38D7E9E7A9A938B8F96A3A28C68998DA0897D9775-834654009"
      },
      "body": null,
      "method": "GET"
    });
    const data = await res.json()
    console.log(data);
    expect(res.ok).toBeTruthy()
    expect(data).not.toBeDefined()
  })
})
