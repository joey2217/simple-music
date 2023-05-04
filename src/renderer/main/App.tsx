import React from 'react'
import Providers from './context/Providers'
import { RouterProvider } from 'react-router-dom'
import router from './router'

const App: React.FC = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}

export default App
