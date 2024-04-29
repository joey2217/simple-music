import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Music } from '../types/player'

interface LikeState {
  musicList: Music[]
  addLikeMusic: (music: Music) => void // 添加喜欢的音乐
  removeLikeMusic: (music: Music) => void
  // artistList: ArtistInfo[]
  // addLikeArtist: (artist: ArtistInfo) => void // 添加喜欢的歌手
  // removeLikeArtist: (artist: ArtistInfo) => void
}

export const useLikeStore = create<LikeState>()(
  persist(
    (set) => ({
      musicList: [],
      addLikeMusic: (music: Music) =>
        set((state) => ({
          musicList: [music, ...state.musicList],
        })),
      removeLikeMusic: (music: Music) =>
        set((state) => ({
          musicList: state.musicList.filter(
            (item) => item.copyrightId !== music.copyrightId
          ),
        })),
      // artistList: [],
      // addLikeArtist: (artist: ArtistInfo) =>
      //   set((s) => ({
      //     artistList: [artist, ...s.artistList],
      //   })),
      // removeLikeArtist: (artist: ArtistInfo) =>
      //   set((s) => ({
      //     artistList: s.artistList.filter((item) => item.id !== artist.id),
      //   })),
    }),
    { name: 'likes' }
  )
)
