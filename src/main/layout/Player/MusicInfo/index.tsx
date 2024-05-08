import React from 'react'
import { usePlayerListStore } from '@/main/store/player'
import Lyric from './Lyric'

const MusicInfo: React.FC = () => {
  const current = usePlayerListStore((s) => s.current)

  if (current) {
    return (
      <div className="flex gap-1">
        <Lyric music={current} />
        <div className="flex-1 truncate">
          <div className="text-lg font-semibold truncate leading-8">
            {current.title}
          </div>
          <div className="truncate leading-8">
            {current.artists.map((a) => a.name).join('/')}
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default MusicInfo
