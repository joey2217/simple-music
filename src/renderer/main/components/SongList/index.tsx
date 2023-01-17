import React, { memo } from 'react'
import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { Artist, SongListDetail, Track } from '../../musicResource/types'
import { usePlayList } from '../../store/hooks'
import SongListIntro from './SongListIntro'
import {
  DownloadOutlined,
  HeartFilled,
  HeartOutlined,
  PlayCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'

interface Props {}

const SongList: React.FC<SongListDetail> = ({
  name,
  coverImgUrl,
  description,
  tracks,
}) => {
  const { addToPlayerList } = usePlayList()
  const columns: ColumnsType<Track> = [
    {
      title: '#',
      key: 'id',
      width: 40,
      align: 'center',
      render(value, record, index) {
        return index + 1
      },
    },
    {
      title: '操作',
      key: 'id',
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
              onClick={() => addToPlayerList([value], true)}
            />
            <DownloadOutlined
              className="cursor-pointer text-base"
              title="下载"
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
      title: '歌曲名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '歌曲名',
      dataIndex: 'artist',
      key: 'id',
      render(artist: Artist[], record, index) {
        return (
          <div>
            {artist.map((a) => (
              <span>{a.name}</span>
            ))}
          </div>
        )
      },
    },
    {
      title: '专辑',
      dataIndex: 'album',
      key: 'id',
      render(album, record, index) {
        return <span>{album.name}</span>
      },
    },
  ]

  return (
    <div>
      <SongListIntro
        name={name}
        coverImgUrl={coverImgUrl}
        description={description}
      />
      <Table
        size="middle"
        scroll={{ y: 'calc(100vh - 380px)' }}
        columns={columns}
        dataSource={tracks}
        pagination={false}
      />
    </div>
  )
}

export default memo(SongList)
