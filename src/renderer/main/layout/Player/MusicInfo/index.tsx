import React from 'react'
import { usePlayer } from '../../../context/PlayerContext'

const MusicInfo: React.FC = () => {
  const { current } = usePlayer()

  if (current) {
    return (
      <div className="flex gap-1">
        <img
          className="h-16 w-16 rounded"
          src={current.pic}
          alt={current.title}
        />
        <div className="flex-1 truncate">
          <h2 className="text-lg font-semibold truncate leading-8">
            {current.title}
          </h2>
          <h3 className="truncate leading-8">
            {current.artists.map((a) => a.name).join('/')}
          </h3>
        </div>
      </div>
    )
  }
  return null
}

export default MusicInfo
