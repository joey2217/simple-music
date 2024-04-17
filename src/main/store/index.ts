import { create } from 'zustand'
import type { User } from '../types'
import { fetchUserInfo } from '../api/app'

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user })),
}))

const setUser = (user: User | null) => useUserStore.setState({ user })

export function getUserInfo() {
  fetchUserInfo().then((data) => {
    setUser(data)
  })
}
getUserInfo()
