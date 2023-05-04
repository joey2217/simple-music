import React, { memo, useState } from 'react'
import { usePlaylist } from '../../../store/hooks'
import Lyric from './Lyric'
import { ChevronDown } from '../../icons'
import { Link } from 'react-router-dom'

const MusicInfo: React.FC = () => {
  const { currentPlay } = usePlaylist()
  const [open, setOpen] = useState(false)

  if (currentPlay) {
    const { pic120, name, artist } = currentPlay
    return (
      <>
        <div className="flex gap-2">
          <div
            onClick={() => setOpen((o) => !o)}
            className="relative flex-shrink-0"
            title={open ? '收起歌词' : '展开歌词'}
          >
            <img className="w-16 h-16 rounded" src={pic120} alt={name} />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer opacity-0 hover:opacity-75 bg-gray-800/60">
              <ChevronDown className={`text-3xl ${open ? '' : 'rotate-180'}`} />
            </div>
          </div>
          <div className="hidden md:block py-1 truncate">
            <h5 onClick={() => setOpen((o) => !o)} className="cursor-pointer">
              {name}
            </h5>
            <Link to={'/artist/' + currentPlay.artistid} className="link">
              {artist}
            </Link>
          </div>
        </div>
        <Lyric open={open} onClose={() => setOpen(false)} />
      </>
    )
  }
  return null
}

export default memo(MusicInfo)
