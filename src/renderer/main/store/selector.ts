import { selector } from 'recoil'
import { playListState, themeState } from './atom'

export const actionDisabledState = selector<boolean>({
  key: 'actionDisabledState',
  get: ({ get }) => {
    const playList = get(playListState)
    return playList.length === 0
  },
})

export const shouldUseDarkColorsState = selector<boolean>({
  key: 'shouldUseDarkColorsState',
  get: ({ get }) => {
    const theme = get(themeState)
    return (
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  },
})
