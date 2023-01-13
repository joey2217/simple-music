import React, { memo } from 'react'
import { Menu } from 'antd'
import { useLocation, Link } from 'react-router-dom'
import { SearchOutlined, SettingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

const items: MenuProps['items'] = [
  {
    label: <Link to="/">搜索</Link>,
    key: '/',
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
