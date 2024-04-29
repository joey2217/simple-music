import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Player from './Player'
import Sider from './Sider'
import useIPC from '../utils/ipc'

const Layout: React.FC = () => {
  useIPC()
  return (
    <>
      <Header />
      <main id="main" className="flex">
        <Sider />
        <div id="content" className="grow block scrollbar">
          <Outlet />
        </div>
      </main>
      <Player />
    </>
  )
}

export default Layout
