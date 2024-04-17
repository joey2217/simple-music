import log from 'electron-log/renderer'
import type { User } from '../types'

const BASE_URL = 'https://www.qwer365.xyz/api'

export function fetchUserInfo(): Promise<User> {
  return fetch(`${BASE_URL}/user-info`).then((res) => res.json())
}
