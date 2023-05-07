import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { useDownload, useMusicLikes, usePlaylist } from '../../store/hooks'
import type { Music } from '../../types'
import {
  FluentAdd,
  FluentArrowDownload,
  FluentHeart,
  PlayOutline,
} from '../icons'

interface Props {
  list: Music[]
}

const MusicList: React.FC<Props> = ({ list }) => {
  const { addPlaylist, playNow } = usePlaylist()
  const { downloadMusic } = useDownload()
  const { musicLikeIds, addLikeMusic, removeLikeMusic } = useMusicLikes()
  return (
    <table className="min-w-full divide-y-2 divide-gray-200 text-base dark:divide-gray-700">
      <thead>
        <tr>
          <th className="py-2">#</th>
          <th className="py-2">操作</th>
          <th className="text-left py-2 w-14"></th>
          <th className="text-left py-2">歌曲</th>
          <th className="text-left py-2">歌手</th>
          <th className="text-left py-2">专辑</th>
          <th className="text-left py-2">时长</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {list.map((m, index) => (
          <tr key={m.rid}>
            <td className="w-10 text-center">
              <div>{index + 1}</div>
            </td>
            <td className="w-24">
              <div className="flex gap-2 justify-center w-full">
                <button
                  title="播放"
                  onClick={() => playNow(m)}
                  className="hover:text-indigo-600"
                >
                  <PlayOutline />
                </button>
                <button
                  title="添加"
                  onClick={() => addPlaylist(m)}
                  className="hover:text-indigo-600"
                >
                  <FluentAdd />
                </button>
                {musicLikeIds.includes(m.rid) ? (
                  <button
                    title="取消喜欢"
                    onClick={() => removeLikeMusic(m)}
                    className="text-red-400"
                  >
                    <FluentHeart />
                  </button>
                ) : (
                  <button
                    title="喜欢"
                    onClick={() => addLikeMusic(m)}
                    className="text-neutral-400"
                  >
                    <FluentHeart />
                  </button>
                )}
                <button
                  title="下载"
                  onClick={() => downloadMusic(m)}
                  className="hover:text-indigo-600"
                >
                  <FluentArrowDownload />
                </button>
              </div>
            </td>
            <td className="py-2">
              <div>
                <img
                  src={m.pic120}
                  alt={m.name}
                  className="w-12 aspect-square"
                />
              </div>
            </td>
            <td>
              <Link to={'/music/' + m.rid}>
                <span>{m.name}</span>
              </Link>
            </td>
            <td className="text-secondary">
              <Link to={'/artist/' + m.artistid}>{m.artist}</Link>
            </td>
            <td className="text-secondary">
              <Link to={'/album/' + m.albumid}>{m.album}</Link>
            </td>
            <td className="text-center text-secondary w-12">
              <div className="w-12">{m.songTimeMinutes}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default memo(MusicList)
