import React, { useEffect, useState } from 'react'
import { fetchPlaylist } from '../../api/migu'
import type { PlayListItem } from '../../types/migu'
import PlayListCard from '../../components/PlayListCard'
import { Link } from 'react-router'
import { buttonVariants } from '@/components/ui/button'

const PlayList: React.FC = () => {
  const [items, setItems] = useState<PlayListItem[]>([])

  useEffect(() => {
    fetchPlaylist('1000001683', 1, 6).then((data) => {
      setItems(data.items)
    })
  }, [])

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="font-semibold">推荐歌单</h2>
        <Link to="/song-lists" className={buttonVariants({ variant: 'link' })}>
          更多歌单&gt;
        </Link>
      </div>
      <div className="grid gap-1 md:gap-1.5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((item) => (
          <PlayListCard key={item.playListId} item={item} />
        ))}
      </div>
    </div>
  )
}

export default PlayList
