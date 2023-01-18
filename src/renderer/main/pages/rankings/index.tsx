import React, { memo, useEffect, useState } from 'react'
import { Skeleton, List } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import SongList from '../../components/SongList'
import SongListIntro from '../../components/SongList/SongListIntro'
import { BoardItem, SongListData } from '../../types'
import { fetchBoards } from '../../api/top'

const Rankings: React.FC = () => {
  const [list, setList] = useState<BoardItem[]>([])
  const [current, setCurrent] = useState<BoardItem | null>(null)

  useEffect(() => {
    fetchBoards().then((data) => {
      setList(data)
      if (data.length > 0) {
        setCurrent(data[0])
      }
    })
  }, [])

  return (
    <div className="flex h-full ">
      <div className="w-56 overflow-auto mr-4 flex-shrink-0">
        <List
          size="small"
          dataSource={list}
          renderItem={(item) => (
            <List.Item onClick={() => setCurrent(item)}>
              <NavItem
                item={item}
                active={item.sourceid === current?.sourceid}
              />
            </List.Item>
          )}
        />
      </div>
      <div className="flex-auto min-w-0">
        {current ? (
          <div>
            <SongListIntro
              name={current.disname}
              coverImgUrl={current.pic}
              description={current.info}
            />
            <SongList songListId={current.sourceid} />
          </div>
        ) : (
          <Skeleton active />
        )}
      </div>
    </div>
  )
}

const NavItem: React.FC<{ item: BoardItem; active?: boolean }> = memo(
  ({ item, active = false }) => {
    return (
      <div
        className={`w-full cursor-pointer flex items-center justify-between hover:text-primary  ${
          active ? 'text-primary' : ''
        }`}
      >
        <span>{item.name}</span> {active && <RightOutlined />}
      </div>
    )
  }
)

export default memo(Rankings)
