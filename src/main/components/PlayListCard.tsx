import React from 'react'
import type { PlayListItem } from '../types/migu'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import LazyLoadImage from './LazyLoadImage'

interface Props {
  item: PlayListItem
}

const PlayListCard: React.FC<Props> = ({ item }) => {
  return (
    <Link to={`/playlist/${item.playListId}`} title={item.playListName}>
      <Card>
        <LazyLoadImage
          src={item.image}
          alt={item.playListName}
          className="rounded-xl aspect-square"
        />
        <h4 className="py-2 px-1 truncate font-medium leading-none">
          {item.playListName}
        </h4>
      </Card>
    </Link>
  )
}

export default PlayListCard
