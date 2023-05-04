import React, { memo } from 'react'
import type { Music, Ranking } from '../../types'
import { FluentAdd, Play, PlayOutline } from '../../components/icons'
import { usePlaylist } from '../../store/hooks'
import { Link } from 'react-router-dom'

interface Props {
  item: Ranking
}

const RankingItem: React.FC<Props> = ({ item }) => {
  const { addPlaylist } = usePlaylist()
  const onPlay = () => {
    addPlaylist(item.musicList)
  }
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md overflow-hidden">
      <div
        className="relative text-white bg-cover flex items-center justify-center bg-no-repeat bg-center bg-gray-800 aspect-video"
        style={{
          backgroundImage: `url(${item.pic})`,
        }}
      >
        <div className="flex w-full h-full items-center justify-center bg-gray-900/50">
          <h3 className="text-2xl font-semibold tracking-widest">
            {item.name.slice(2)}
          </h3>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-end justify-end  opacity-0 hover:opacity-95">
          <button
            className="text-4xl p-3 m-3 bg-gray-600/70 rounded-full"
            title="播放"
            onClick={onPlay}
          >
            <Play />
          </button>
        </div>
      </div>
      <div className="p-2">
        {item.musicList.map((m, index) => (
          <MusicItem key={m.rid} item={m} num={index + 1} />
        ))}
      </div>
    </div>
  )
}

interface MusicProps {
  item: Music
  num: number
}

const MusicItem: React.FC<MusicProps> = ({ item, num }) => {
  const { addPlaylist } = usePlaylist()
  return (
    <div className="flex items-center py-2 gap-1">
      <div className="w-6 shrink-0 text-center">{num}</div>
      <div className="flex-1 truncate flex flex-col gap-1">
        <Link
          to={'/music/' + item.rid}
          className="truncate cursor-pointer hover:font-semibold text-gray-900 hover:text-gray-900/50 dark:text-gray-100 dark:hover:text-gray-100/50"
          title={item.name}
        >
          {item.name}
        </Link>
        <Link
          to={'/artist/' + item.artistid}
          className="truncate text-sm  cursor-pointer text-gray-600 hover:text-gray-600/50 dark:text-gray-400 dark:hover:text-gray-400/50"
          title={item.artist}
        >
          {item.artist}
        </Link>
      </div>
      <button
        title="播放"
        onClick={() => addPlaylist(item, { playNow: true })}
        className="text-xl p-2 rounded-full"
      >
        <PlayOutline />
      </button>
      <button
        title="添加到播放列表"
        onClick={() => addPlaylist(item)}
        className="text-xl p-2 rounded-full"
      >
        <FluentAdd />
      </button>
    </div>
  )
}

export default memo(RankingItem)
