import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Player from './Player'
import Sider from './Sider'

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main id="main" className="flex">
        <Sider />
        <section id="content" className="grow">
          <Outlet />
        </section>
      </main>
      <Player />
    </>
  )
}

export default Layout
