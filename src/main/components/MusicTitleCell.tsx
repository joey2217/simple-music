import React, { useMemo } from 'react'
import LazyImage from './LazyLoadImage'
import type { Music } from '../types/player'
import { usePlayerList, usePlayerListStore } from '../store/player'
import { Play } from 'lucide-react'
import { Link } from 'react-router'

interface Props {
  music: Music
  className?: string
}

const MusicTitleCell: React.FC<Props> = ({ music, className = '' }) => {
  const { play } = usePlayerList()
  const current = usePlayerListStore((s) => s.current)

  const playing = useMemo(
    () => current?.copyrightId === music.copyrightId,
    [current, music]
  )
  return (
    <div
      className={`flex items-center gap-2 max-w-40 md:max-w-xs lg:max-w-sm xl:max-w-md 2xl:max-w-xl ${className} ${
        playing ? 'text-primary' : ''
      }`}
    >
      <div className="group/cover relative rounded-md w-10 h-10">
        <LazyImage
          src={music.pic}
          alt="album"
          className="w-10 h-10 rounded-md"
        />
        <div
          className={`absolute left-0 top-0 w-full h-full flex justify-center items-center ${
            playing ? 'opacity-100' : 'opacity-0'
          } group-hover/cover:opacity-100 transition-opacity duration-300 cursor-pointer`}
          onClick={() => play(music)}
          title="播放"
        >
          <Play />
        </div>
      </div>
      <div className="truncate flex-1">
        <div className="truncate font-semibold text-base" title={music.title}>
          {music.title}
        </div>
        <div className="truncate artists">
          {music.artists.map((artist) => (
            <Link to={`/artist/${artist.id}`} key={artist.id}>
              <span
                className={`${
                  playing
                    ? 'text-primary'
                    : 'text-accent-foreground/80 hover:text-accent-foreground'
                }  underline-offset-4 hover:underline`}
              >
                {artist.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MusicTitleCell
