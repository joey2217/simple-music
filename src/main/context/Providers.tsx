import React, { type PropsWithChildren } from 'react'
import { AppProvider } from './AppContext'
import { PlayerProvider } from './PlayerContext'
import { Toaster } from '@/components/ui/toaster'
import { PlaylistProvider } from './PlaylistContext'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppProvider>
      <PlaylistProvider>
        <PlayerProvider>
          {children}
          <Toaster />
        </PlayerProvider>
      </PlaylistProvider>
    </AppProvider>
  )
}

export default Providers
