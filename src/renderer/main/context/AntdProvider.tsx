import React, { memo } from 'react'
import type { PropsWithChildren } from 'react'
import { ConfigProvider, App, theme, Layout } from 'antd'
import { useRecoilValue } from 'recoil'
import { shouldUseDarkColorsState } from '../store/selector'

const { darkAlgorithm, defaultAlgorithm } = theme

const AntdProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const shouldUseDarkColors = useRecoilValue(shouldUseDarkColorsState)

  return (
    <ConfigProvider
      theme={{
        algorithm: shouldUseDarkColors ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: '#14b8a6',
        },
      }}
    >
      <App>
        <AntdLayout>{children}</AntdLayout>
      </App>
    </ConfigProvider>
  )
}

const AntdLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    token: { colorText, colorBgBase },
  } = theme.useToken()
  return (
    <Layout
      className="min-h-screen"
      style={{
        color: colorText,
        backgroundColor: colorBgBase,
      }}
    >
      {children}
    </Layout>
  )
}

export default memo(AntdProvider)
