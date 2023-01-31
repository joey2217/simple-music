import React, { memo } from 'react'
import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  DownloadOutlined,
  HeartFilled,
  PlayCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import type { SongListItem } from '../../types'
import { usePlayList, useDownloadList } from '../../store/hooks'

interface Props {
  dataSource: SongListItem[]
  onPageChange: (page: number) => void
  total?: number
  y?: string | number
}

const SongList: React.FC<Props> = ({
  dataSource,
  onPageChange,
  total = 0,
  y = 'calc(100vh - 416px)',
}) => {
  const { addToPlayerList } = usePlayList()
  const { addDownloadItems } = useDownloadList()
  const columns: ColumnsType<SongListItem> = [
    {
      title: '#',
      key: 'rid',
      width: 40,
      align: 'center',
      render(value, record, index) {
        return index + 1
      },
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
            <PlayCircleOutlined
              className="cursor-pointer text-base"
              title="播放"
              onClick={() => addToPlayerList([record], true)}
            />
            <DownloadOutlined
              className="cursor-pointer text-base"
              title="下载"
              onClick={() => addDownloadItems([record])}
            />
            <PlusOutlined
              className="cursor-pointer text-base"
              title="添加到播放列表"
            />
          </Space>
        )
      },
    },
    {
      title: '歌曲',
      dataIndex: 'name',
      key: 'rid',
    },
    {
      title: '歌手',
      dataIndex: 'artist',
      key: 'rid',
    },
    {
      title: '专辑',
      dataIndex: 'album',
      key: 'rid',
    },
  ]

  return (
    <Table
      size="middle"
      scroll={{ y }}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        position: ['bottomCenter'],
        total: total,
        defaultPageSize: 30,
        showSizeChanger: false,
        onChange: onPageChange,
      }}
    />
  )
}

export default memo(SongList)
