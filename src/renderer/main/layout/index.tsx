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
        <aside>
          <Sider />
        </aside>
        <section>
          123
          {/* <Outlet /> */}
        </section>
      </main>
      <Player />
    </>
  )
}

export default Layout
