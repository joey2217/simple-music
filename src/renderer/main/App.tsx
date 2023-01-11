import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'

const App: React.FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
