import React, { memo, useState } from 'react'
import {
  CaretRightOutlined,
  HeartFilled,
  MenuOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Space, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { usePlayList } from '../../store/hooks'
import type { SongListItem } from '../../types'

const { Text } = Typography

const PlayList: React.FC = () => {
  const { playList, currentPlay, playListSong } = usePlayList()
  const [open, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
  }
  const columns: ColumnsType<SongListItem> = [
    {
      title: '#',
      key: 'rid',
      dataIndex: 'rid',
      width: 20,
      render(value, record, index) {
        return currentPlay?.rid === value && <CaretRightOutlined />
      },
    },
    {
      title: '歌曲',
      dataIndex: 'name',
      key: 'rid',
      render(value, record, index) {
        return <Text ellipsis={{ tooltip: value }}>{value}</Text>
      },
    },
    {
      title: '歌手',
      dataIndex: 'artist',
      key: 'rid',
      render(value, record, index) {
        return <Text ellipsis={{ tooltip: value }}>{value}</Text>
      },
    },
    {
      title: '时长',
      dataIndex: 'songTimeMinutes',
      key: 'rid',
      width: 60,
    },
    {
      title: '操作',
      key: 'rid',
      width: 100,
      align: 'center',
      dataIndex: 'id',
      render(value, record, index) {
        return (
          <Space>
            {/* <HeartOutlined className="cursor-pointer" title="收藏" /> */}
            <HeartFilled
              className="cursor-pointer text-base"
              title="收藏"
              style={{ color: 'red' }}
            />
          </Space>
        )
      },
    },
  ]

  return (
    <div className="text-right">
      <Button onClick={() => setOpen((s) => !s)} icon={<MenuOutlined />} />
      <Drawer
        rootStyle={{
          bottom: 80,
        }}
        contentWrapperStyle={{
          width: '500px',
          marginLeft: 'auto',
        }}
        bodyStyle={{
          padding: 0,
        }}
        height="calc(100vh - 80px)"
        title={`播放列表(${playList.length})`}
        placement="bottom"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>清空</Button>
          </Space>
        }
      >
        <Table
          size="middle"
          showHeader={false}
          scroll={{ y: 'calc(100vh - 145px)' }}
          columns={columns}
          dataSource={playList}
          pagination={false}
          rowKey="rid"
          onRow={(record) => {
            return {
              onClick: (event) => playListSong(record), // 点击行
            }
          }}
        />
      </Drawer>
    </div>
  )
}

export default memo(PlayList)
