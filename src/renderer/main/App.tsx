import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import { useRecoilValue } from 'recoil'
import router from './router'
import { themeState } from './store/atom'

const { darkAlgorithm, defaultAlgorithm } = theme

const App: React.FC = () => {
  const theme = useRecoilValue(themeState)
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#8bbb11',
        },
        algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <StyleProvider hashPriority="high">
        <RouterProvider router={router} />
      </StyleProvider>
    </ConfigProvider>
  )
}

export default App
