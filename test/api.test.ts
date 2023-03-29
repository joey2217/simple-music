import { describe, expect, test } from 'vitest'
import { fetchBoards } from '../src/renderer/main/api/top'

describe('TEST API', () => {
  test('fetchBoardData res not null', async () => {
    const data = await fetchBoards()
    console.log(data)
    expect(data.length).greaterThan(0)
  })
})
