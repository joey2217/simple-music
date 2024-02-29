import React, { type PropsWithChildren } from 'react'
import { AppProvider } from './AppContext'
import { PlayerProvider } from './PlayerContext'
import { Toaster } from '@/components/ui/toaster'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppProvider>
      <PlayerProvider>
        {children}
        <Toaster />
      </PlayerProvider>
    </AppProvider>
  )
}

export default Providers
