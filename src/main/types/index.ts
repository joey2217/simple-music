export interface Option<K = string, V = string> {
  label: K
  value: V
}

export interface User {
  id: number
  nickname: string
  username: string
  role: number
  avatar: string
}

 

export interface Playlist {
  id: string
  title: string
  cover: string
  count: number
  desc?: string
}

export type UpdateType = 'auto' | 'hint' | 'manual'
