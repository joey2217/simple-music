import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useIPC() {
  const navigate = useNavigate()

  useEffect(() => {
    const removeListener = window.messageAPI.onNavigate((to) => {
      navigate(to)
    })
    return removeListener
  }, [navigate])
}
