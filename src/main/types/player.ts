import type { Artist } from './migu'

export interface Music {
  copyrightId: string
  title: string
  artist: string
  artists: Artist[]
  album?: string
  albumId?: string
  pic: string
  url?: string
}

export interface LyricRow {  
  time?: number
  words: string
}

export type PlayMode = 'sequence' | 'loop' | 'repeat' | 'shuffle'
