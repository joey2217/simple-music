import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import router from './router'

const { darkAlgorithm, defaultAlgorithm } = theme

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
