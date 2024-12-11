import React from 'react'
import { usePlayerListStore } from '@/main/store/player'
import Lyric from './Lyric'
import { Link } from 'react-router'
import emitter from '@/main/utils/emitter'

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
          <div className="truncate leading-8 artists">
            {current.artists.map((artist) => (
              <Link
                to={`/artist/${artist.id}`}
                key={artist.id}
                onClick={() => emitter.emit('closeLyric')}
              >
                <span className="underline-offset-4 hover:underline text-accent-foreground/80 hover:text-accent-foreground">
                  {artist.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default MusicInfo
