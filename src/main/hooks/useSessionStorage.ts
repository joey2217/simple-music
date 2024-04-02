import { useEffect, useState } from 'react'

export default function useSessionStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    const localData = sessionStorage.getItem(key)
    if (localData) {
      try {
        return JSON.parse(localData) as T
      } catch (error) {
        /* empty */
      }
    }
    return defaultValue
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
