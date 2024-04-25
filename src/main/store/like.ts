import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Music } from '../types/player'
import type { ArtistInfo } from '../types/migu'

interface LikeState {
  musicList: Music[]
  artistList: ArtistInfo[]
}

export const useLikeStore = create<LikeState>()(
  persist(
    (set) => ({
      musicList: [],
      artistList: [],
    }),
    { name: 'likes' }
  )
)
