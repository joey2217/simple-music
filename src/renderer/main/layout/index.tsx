import React, { memo, useState } from 'react'
import { Layout } from 'antd'
import AppMenu from './AppMenu'
import { Outlet } from 'react-router-dom'
import Search from '../components/Search'
import Player from '../components/Player'
import TitleBar from './TitleBar'

const { Content, Sider, Header, Footer } = Layout

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="h-screen overflow-hidden relative" id='layout'>
      <TitleBar />
      <Layout>
        <Sider
          id="sider"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              background: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            12312
          </div>
          <AppMenu />
        </Sider>
        <Layout>
          <Header
            style={{ padding: 0 }}
            className="flex justify-center items-center"
          >
            <Search />
          </Header>
          <Content
            style={{
              padding: 16,
              margin: 0,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ padding: 0, position: 'relative', zIndex: 2000 }}>
        <Player />
      </Footer>
    </Layout>
  )
}

export default memo(AppLayout)
