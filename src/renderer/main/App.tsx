import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { PlayerProvider } from './context/PlayerContext'

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <RouterProvider router={router} />
    </PlayerProvider>
  )
}

export default App
