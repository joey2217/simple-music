import React, { memo, useState } from 'react'
import { Layout, theme } from 'antd'
import AppMenu from './AppMenu'
import { Outlet } from 'react-router-dom'
import Search from '../components/Search'

const { Content, Sider, Header } = Layout

const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="h-screen overflow-hidden">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: colorBgContainer }}
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
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-center items-center"
        >
          <Search />
        </Header>
        <Content
          style={{
            padding: 24,
            margin: 0,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default memo(AppLayout)
