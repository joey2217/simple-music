import React from 'react'
import type { PlayListItem } from '../types/migu'
import { Link } from 'react-router-dom'
import {
  Card,
} from '@/components/ui/card'
import Image from './Image'

interface Props {
  item: PlayListItem
}

const PlayListCard: React.FC<Props> = ({ item }) => {
  return (
    <Link to={`/playlist/${item.playListId}`}>
      <Card>
        <Image src={item.image} alt={item.playListName} className="rounded-xl" />
        <h4 className="py-2 px-1 truncate font-medium leading-none">
          {item.playListName}
        </h4>
      </Card>
    </Link>
  )
}

export default PlayListCard
