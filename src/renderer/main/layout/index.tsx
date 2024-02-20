import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Player from './Player'

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Player />
    </>
  )
}

export default Layout
