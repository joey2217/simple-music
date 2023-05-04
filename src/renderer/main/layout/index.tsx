import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Player from '../components/Player'

const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto py-4 mb-20">
        <Outlet />
      </main>
      <section className="fixed bottom-0 z-50 w-full">
        <Player />
      </section>
    </>
  )
}

export default memo(AppLayout)
