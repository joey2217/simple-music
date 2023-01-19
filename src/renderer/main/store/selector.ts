import { selector } from 'recoil'
import { playListState } from './atom'

export const actionDisabledState = selector<boolean>({
  key: 'actionDisabledState',
  get: ({ get }) => {
    const playList = get(playListState)
    return playList.length === 0
  },
})
