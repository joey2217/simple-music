import { useEffect, useState } from 'react'

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  let prevData = defaultValue
  try {
    let localStr = localStorage.getItem(key)
    if (localStr != null) {
      prevData = JSON.parse(localStr) as T
    }
  } catch (error) {
    console.error('JSON.parse error:', error)
  }

  const [value, setValue] = useState<T>(prevData)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
