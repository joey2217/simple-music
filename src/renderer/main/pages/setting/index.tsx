import React, { memo } from 'react'
import { Button, Tabs } from 'antd'
import { toggleDevtools } from '../../utils/ipc'
import { fetchToken } from '../../api/request'
import { fetchSearchKey } from '../../api/top'
import type { TabsProps } from 'antd'
import Download from './Download'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Tab 1`,
    children: `Content of Tab Pane 1`,
  },
  {
    key: 'Download',
    label: `下载`,
    children: <Download />,
  },
]

const Setting: React.FC = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" tabPosition="left" items={items} />
      <Button onClick={toggleDevtools}>ToggleDevtools</Button>
      <Button onClick={fetchToken}>api</Button>
      <Button onClick={fetchSearchKey}>fetchSearchKey</Button>
    </div>
  )
}

export default memo(Setting)
