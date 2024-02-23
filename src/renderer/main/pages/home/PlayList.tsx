import React, { useEffect, useState } from 'react'
import { fetchPlaylist } from '../../api/migu'
import type { PlayListItem } from '../../types/migu'
import PlayListCard from '../../components/PlayListCard'

const PlayList: React.FC = () => {
  const [items, setItems] = useState<PlayListItem[]>([])

  useEffect(() => {
    fetchPlaylist('1000001683').then((data) => {
      setItems(data.items)
    })
  }, [])

  return (
    <div className="page">
      <div>
        <h2 className="text-lg font-semibold">推荐歌单</h2>
      </div>
      <div className="grid gap-1 grid-cols-8">
        {items.map((item) => (
          <PlayListCard key={item.playListId} item={item} />
        ))}
      </div>
    </div>
  )
}

export default PlayList
