import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { UpdateType } from '../types'

export default function useIPC() {
  const navigate = useNavigate()

  useEffect(() => {
    const removeListener = window.messageAPI.onNavigate((to) => {
      navigate(to)
    })
    return removeListener
  }, [navigate])

  useEffect(() => {
    const update = localStorage.getItem('auto_update') as UpdateType
    if (update && update !== 'manual') {
      window.electronAPI.checkUpdate(update)
    }
  }, [])
}
