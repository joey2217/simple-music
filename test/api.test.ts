import { describe, expect, test } from 'vitest'
import { fetchBoardData } from '../src/renderer/main/api/top'

describe('TEST API', () => {
  test('fetchBoardData res not null', async () => {
    const data = await fetchBoardData('27553319')
    console.log(data)
    expect(data.length).greaterThan(0)
  })
})
