import { atom } from 'recoil'
import {
  getTheme,
  simpleLocalStorageEffect,
  LOCAL_THEME,
  setTheme,
} from './utils'
import type { Theme } from './utils'

export const themeState = atom<Theme>({
  key: 'themeState',
  default: getTheme(),
  effects: [
    simpleLocalStorageEffect<Theme>(LOCAL_THEME),
    ({ onSet }) => {
      onSet((theme) => {
        setTheme(theme)
      })
    },
  ],
})
