import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Music } from '../types/player'

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
