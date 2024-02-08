import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main id="main">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
