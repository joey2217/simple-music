import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { useRecoilValue } from 'recoil'
import router from './router'
import { themeState } from './store/atom'

const { darkAlgorithm, defaultAlgorithm } = theme

const App: React.FC = () => {
  const theme = useRecoilValue(themeState)
  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
