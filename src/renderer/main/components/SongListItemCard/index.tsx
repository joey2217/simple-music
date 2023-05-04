import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Play, PlayArrowRounded } from '../icons'
import type { SongListItem } from '../../types/songList'
import { usePlaylist } from '../../store/hooks'

interface Props {
  item: SongListItem
}

const SongListItemCard: React.FC<Props> = ({ item }) => {
  const { playSongList } = usePlaylist()

  const onPlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    playSongList(item.id)
  }

  return (
    <div>
      <Link
        to={'/song-list/detail/' + item.id}
        className="block rounded overflow-hidden"
      >
        <div className="relative cursor-pointer transition ease-in-out duration-300 hover:scale-105 ">
          <img
            src={item.img}
            alt={item.name}
            className="w-full rounded aspect-square"
          />
          <div className="absolute z-20 top-0 left-0 w-full h-full flex items-center hover:bg-gray-900/40 justify-center opacity-0 hover:opacity-95">
            <button
              className="text-4xl p-3 bg-gray-600/70 rounded-full"
              title="播放"
              onClick={onPlay}
            >
              <Play />
            </button>
          </div>
        </div>
      </Link>
      <Link to={'/song-list/detail/' + item.id} title={item.name}>
        <div className="truncate">{item.name}</div>
      </Link>
      <div className="flex gap-2 items-center">
        <PlayArrowRounded />
        <span>{Number(item.listencnt).toLocaleString()}</span>
      </div>
    </div>
  )
}

export default memo(SongListItemCard)
