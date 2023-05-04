import React, { memo } from 'react'
import { RecoilRoot } from 'recoil'
import type { PropsWithChildren } from 'react'
import { ThemeProvider } from './ThemeContext'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <RecoilRoot>
      <ThemeProvider>{children}</ThemeProvider>
    </RecoilRoot>
  )
}

export default memo(Providers)
