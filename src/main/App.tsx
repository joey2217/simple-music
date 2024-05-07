import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import Providers from './context/Providers'
import Player from './layout/Player'

const App: React.FC = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
      <Player />
    </Providers>
  )
}

export default App
