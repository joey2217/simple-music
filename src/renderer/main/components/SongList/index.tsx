import React, { memo } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import type { Artist, SongListDetail, Track } from '../../musicResource/types'

const SongList: React.FC<SongListDetail> = ({
  name,
  coverImgUrl,
  description,
  tracks,
}) => {
  const columns: ColumnsType<Track> = [
    {
      title: '#',
      key: 'id',
      width: 40,
      render(value, record, index) {
        return index
      },
    },
    {
      title: '操作',
      key: 'id',
      render(value, record, index) {
          return <>+</>
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
      <Table
        size="middle"
        scroll={{ y: 600 }}
        columns={columns}
        dataSource={tracks}
        pagination={false}
      />
    </div>
  )
}

export default memo(SongList)
