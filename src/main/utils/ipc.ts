import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { autoUpdate } from './app'

export default function useIPC() {
  const navigate = useNavigate()

  useEffect(() => {
    const removeListener = window.messageAPI.onNavigate((to) => {
      navigate(to)
    })
    return removeListener
  }, [navigate])

  useEffect(() => {
    if (autoUpdate && autoUpdate !== 'manual') {
      window.electronAPI.checkUpdate(autoUpdate)
    }
  }, [])
}
