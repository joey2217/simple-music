import React from 'react'
import type { PlayListItem } from '../types/migu'
import { Link } from 'react-router-dom'

interface Props {
  item: PlayListItem
}

const PlayListCard: React.FC<Props> = ({ item }) => {
  return (
    <Link  className="text-center" to={`/playlist/${item.playListId}`}>
      <img src={item.image} alt={item.playListName} />
      <h4>{item.playListName}</h4>
    </Link>
  )
}

export default PlayListCard
