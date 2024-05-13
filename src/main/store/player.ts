import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Music } from '../types/player'
import { useCallback } from 'react'
import {
  mode,
  shuffleIndexList,
  initPlayer,
  setLocalIndex,
  index,
} from '../utils/player'

interface PlayerListState {
  current?: Music
  playList: Music[]
  setCurrent: (m?: Music) => void
  setCurrentNext: (dir: 'next' | 'prev') => void
  setPlayList: (playList: Music[]) => void
  appendPlayList: (m: Music[]) => void
  removePlayList: (index: number) => void
}

export const usePlayerListStore = create<PlayerListState>()(
  persist(
    (set) => ({
      current: undefined,
      playList: [],
      setCurrent: (m) =>
        set(() => ({
          current: m,
        })),
      setCurrentNext: (dir: 'next' | 'prev') =>
        set((state) => {
          const playList = state.playList
          if (playList.length > 0) {
            if (dir === 'next') {
              if (mode === 'sequence') {
                const i = index + 1 > playList.length - 1 ? -1 : index + 1
                setLocalIndex(i)
              } else {
                const i = index + 1 > playList.length - 1 ? 0 : index + 1
                setLocalIndex(i)
              }
            } else {
              if (mode === 'sequence') {
                const i = index - 1 < 0 ? -1 : index - 1
                setLocalIndex(i)
              } else {
                const i = index - 1 < 0 ? playList.length - 1 : index - 1
                setLocalIndex(i)
              }
            }
            console.log('index', index)
            return {
              current:
                mode === 'shuffle'
                  ? playList[shuffleIndexList[index]]
                  : playList[index],
            }
          }
          return {}
        }),
      setPlayList: (playList) => set(() => ({ playList })),
      appendPlayList: (m) =>
        set((state) => ({
          playList: [
            ...state.playList,
            ...m.filter(
              (p) =>
                !state.playList.some((c) => c.copyrightId === p.copyrightId)
            ),
          ],
        })),
      removePlayList: (index) =>
        set((state) => ({
          playList: state.playList.toSpliced(index, 1),
        })),
    }),
    {
      name: 'playlistStore',
    }
  )
)

export function usePlayerList() {
  const setCurrent = usePlayerListStore((s) => s.setCurrent)
  const setCurrentNext = usePlayerListStore((s) => s.setCurrentNext)
  const appendPlayList = usePlayerListStore((s) => s.appendPlayList)
  const setPlayList = usePlayerListStore((s) => s.setPlayList)

  const addToPlayList = useCallback(
    (m: Music | Music[], replace = false) => {
      initPlayer()
      if (Array.isArray(m)) {
        if (replace) {
          setCurrent(mode === 'shuffle' ? m[shuffleIndexList[0]] : m[0])
          setPlayList(m)
          setLocalIndex(0)
        } else {
          appendPlayList(m)
        }
      } else {
        appendPlayList([m])
      }
    },
    [appendPlayList, setCurrent, setPlayList]
  )

  // TODO
  const playNext = useCallback(
    (dir: 'next' | 'prev' = 'next') => {
      initPlayer()
      setCurrentNext(dir)
    },
    [setCurrentNext]
  )

  const play = useCallback(
    (song: Music) => {
      initPlayer()
      setCurrent(song)
      appendPlayList([song])
    },
    [appendPlayList, setCurrent]
  )

  const clearPlayerList = useCallback(() => {
    setCurrent(undefined)
    setLocalIndex(-1)
    setPlayList([])
  }, [setCurrent, setPlayList])

  return {
    play,
    addToPlayList,
    playNext,
    clearPlayerList,
  } as const
}

// interface PlayerState {
//   paused: boolean
//   duration: number
//   time: number
//   setPaused: (paused: boolean) => void
//   setDuration: (duration: number) => void
//   setTime: (time: number) => void
// }

// export const usePlayerStore = create<PlayerState>()((set) => ({
//   paused: true,
//   duration: 0,
//   time: 0,
//   setDuration: (duration) => set(() => ({ duration })),
//   setTime: (time) => set(() => ({ time })),
//   setPaused: (paused) => set(() => ({ paused })),
// }))
