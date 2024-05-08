import React from 'react'
import Image from '@/main/components/Image'
import { usePlayerListStore } from '@/main/store/player'

const MusicInfo: React.FC = () => {
  const current = usePlayerListStore((s) => s.current)

  if (current) {
    return (
      <div className="flex gap-1">
        <Image
          className="h-16 w-16 rounded"
          src={current.pic}
          alt={current.title}
        />
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
