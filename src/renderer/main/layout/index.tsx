import React, { memo, useState } from 'react'
import { Layout, theme } from 'antd'
import AppMenu from './AppMenu'
import { Outlet } from 'react-router-dom'
import Search from '../components/Search'
import Player from '../components/Player'

const { Content, Sider, Header, Footer } = Layout

const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout
      className="h-screen overflow-hidden"
      style={{ background: colorBgContainer, color: colorText }}
    >
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
              background: colorBgContainer,
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
