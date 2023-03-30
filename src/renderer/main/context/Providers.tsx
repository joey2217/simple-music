import React, { memo } from 'react'
import type { PropsWithChildren } from 'react'
import AntdProvider from './AntdProvider'
import { RecoilRoot } from 'recoil'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <RecoilRoot>
      <AntdProvider>{children}</AntdProvider>
    </RecoilRoot>
  )
}

export default memo(Providers)
