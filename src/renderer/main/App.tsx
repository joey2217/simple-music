import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { PlayerProvider } from './context/PlayerContext'
import { Toaster } from '@/components/ui/toaster'

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <RouterProvider router={router} />
      <Toaster />
    </PlayerProvider>
  )
}

export default App
