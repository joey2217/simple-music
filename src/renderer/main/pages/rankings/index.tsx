import React, { memo, useEffect, useState } from 'react'
import { Skeleton, List } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import resource from '../../api'
import type { SongListDetail, SongListItem } from '../../api/types'
import SongList from '../../components/SongList'

const Rankings: React.FC = () => {
  const [list, setList] = useState<SongListItem[]>([])
  const [current, setCurrent] = useState<string | number>('')
  const [songList, setSongList] = useState<SongListDetail | null>(null)

  useEffect(() => {
    resource.fetchTopList().then((data) => {
      setList(data)
      if (data.length > 0) {
        setCurrent(data[0].id)
      }
    })
  }, [])

  useEffect(() => {
    if (current) {
      resource.fetchSongListDetail(current).then((data) => {
        setSongList(data)
      })
    }
  }, [current])

  return (
    <div className="flex h-full ">
      <div className="w-56 overflow-auto mr-4 flex-shrink-0">
        <List
          size="small"
          dataSource={list}
          renderItem={(item) => (
            <List.Item onClick={() => setCurrent(item.id)}>
              <NavItem item={item} active={item.id === current} />
            </List.Item>
          )}
        />
      </div>
      <div className="flex-auto min-w-0">
        {songList ? <SongList {...songList} /> : <Skeleton active />}
      </div>
    </div>
  )
}

const NavItem: React.FC<{ item: SongListItem; active?: boolean }> = memo(
  ({ item, active = false }) => {
    return (
      <div
        className={`w-full cursor-pointer flex items-center justify-between hover:text-primary  ${
          active ? 'text-primary' : ''
        }`}
        title={item.description}
      >
        <span>{item.name}</span> {active && <RightOutlined />}
      </div>
    )
  }
)

export default memo(Rankings)
