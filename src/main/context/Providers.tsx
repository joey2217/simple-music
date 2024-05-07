import React, { type PropsWithChildren } from 'react'
import { AppProvider } from './AppContext'
import { Toaster } from '@/components/ui/toaster'
import { PlaylistProvider } from './PlaylistContext'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppProvider>
      <PlaylistProvider>
        {children}
        <Toaster />
      </PlaylistProvider>
    </AppProvider>
  )
}

export default Providers
