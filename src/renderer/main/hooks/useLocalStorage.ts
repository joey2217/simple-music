import { useEffect, useState } from 'react'

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(defaultValue)
  useEffect(() => {
    const localData = localStorage.getItem(key)
    if (localData) {
      try {
        const data = JSON.parse(localData)
        setValue(data)
      } catch (error) {
        console.error(error)
        setValue(defaultValue)
      }
    } else {
      setValue(defaultValue)
    }
  }, [defaultValue, key])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
