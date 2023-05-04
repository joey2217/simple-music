import { useEffect, useState } from 'react'

export default function useLocalStorage<T>(key: string, defalutValue: T) {
  const [value, setValue] = useState(defalutValue)
  useEffect(() => {
    const localData = localStorage.getItem(key)
    if (localData) {
      try {
        const data = JSON.parse(localData)
        setValue(data)
      } catch (error) {
        console.error(error)
        setValue(defalutValue)
      }
    } else {
      setValue(defalutValue)
    }
  }, [defalutValue, key])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
