import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Player from './Player'
import Sider from './Sider'
import { ScrollArea } from '@/components/ui/scroll-area'

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main id="main" className="flex">
        <Sider />
        <ScrollArea id="content" className="grow block">
          <Outlet />
        </ScrollArea>
      </main>
      <Player />
    </>
  )
}

export default Layout
