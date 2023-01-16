import React, { memo } from 'react'
import { Menu } from 'antd'
import { useLocation, Link } from 'react-router-dom'
import {
  OrderedListOutlined,
  SearchOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

const items: MenuProps['items'] = [
  {
    label: <Link to="/">排行</Link>,
    key: '/',
    icon: <OrderedListOutlined />,
  },
  {
    label: <Link to="/song-list">歌单</Link>,
    key: '/song-list',
    icon: <UnorderedListOutlined />,
  },
  {
    label: <Link to="/search">搜索</Link>,
    key: '/search',
    icon: <SearchOutlined />,
  },
  {
    label: <Link to="/setting">设置</Link>,
    key: '/setting',
    icon: <SettingOutlined />,
  },
]

const AppMenu: React.FC = () => {
  const location = useLocation()
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[location.pathname]}
      mode="inline"
      items={items}
    />
  )
}

export default memo(AppMenu)
