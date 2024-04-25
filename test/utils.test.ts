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
