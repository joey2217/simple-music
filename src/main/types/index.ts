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
