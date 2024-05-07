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

interface RecentState {
  recent: Music[]
  addRecent: (m: Music) => void
  removeRecent: (m: Music) => void
  clearRecent: () => void
}

const RECENT_LIMIT = 100

export const useRecentListStore = create<RecentState>()(
  persist(
    (set) => ({
      recent: [],
      addRecent: (m) =>
        set((state) => ({
          recent: [m]
            .concat(state.recent.filter((r) => r.copyrightId !== m.copyrightId))
            .slice(0, RECENT_LIMIT),
        })),
      removeRecent: (m) =>
        set((state) => ({
          recent: state.recent.filter((r) => r.copyrightId !== m.copyrightId),
        })),
      clearRecent: () => set({ recent: [] }),
    }),
    {
      name: 'recently-played',
    }
  )
)

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

interface PlaylistState {
  current?: Music
  playList: Music[]
  setCurrent: (m?: Music, force?: boolean) => void
  setPlayList: (playList: Music[]) => void
  appendPlayList: (m: Music[]) => void
  removePlayList: (index: number) => void
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set) => ({
      current: undefined,
      playList: [],
      setCurrent: (m) => set(() => ({ current: m })),
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

export function usePlaylist() {
  const setCurrent = usePlaylistStore((s) => s.setCurrent)
  const playList = usePlaylistStore((s) => s.playList)
  const appendPlayList = usePlaylistStore((s) => s.appendPlayList)

  const addToPlayList = useCallback(
    (m: Music | Music[], replace = false) => {
      initPlayer()
      if (Array.isArray(m)) {
        if (replace) {
          setCurrent(mode === 'shuffle' ? m[shuffleIndexList[0]] : m[0])
        } else {
          appendPlayList(m)
        }
      } else {
        appendPlayList([m])
      }
    },
    [appendPlayList, setCurrent]
  )

  const playNext = useCallback(
    (dir: 'next' | 'prev' = 'next') => {
      initPlayer()
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
      setCurrent(
        mode === 'shuffle' ? playList[shuffleIndexList[index]] : playList[index]
      )
    },
    [setCurrent, playList]
  )

  const play = useCallback(
    (song: Music) => {
      initPlayer()
      setCurrent(song)
      appendPlayList([song])
    },
    [appendPlayList, setCurrent]
  )

  return {
    play,
    addToPlayList,
    playNext,
  } as const
}
