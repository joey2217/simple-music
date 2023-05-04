import React, { memo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useMusicLikes, usePlaylist } from '../../../store/hooks'
import {
  FluentDelete,
  FluentHeart,
  Play,
  Pause,
  PlayListIcon,
  PlayingIcon,
  RoundClose,
} from '../../icons'

const PlayList: React.FC = () => {
  const {
    playlist,
    currentPlay,
    clearPlaylist,
    playing,
    removePlaylistMusic,
    setCurrentPlayIndex,
  } = usePlaylist()
  const { musicLikeIds, addLikeMusic, removeLikeMusic } = useMusicLikes()
  const [open, setOpen] = useState(false)
  return (
    <div>
      {createPortal(
        <div
          className={`fixed titleBar-top right-0 z-30 text-sm p-4 rounded h-screen max-w-full w-[475px] bg-neutral-100 dark:bg-neutral-700/95 transition-transform ease-in-out duration-300 ${
            open ? 'translate-y-0' : 'translate-y-full'
          }	`}
        >
          <div className="flex items-center">
            <h4 className="text-lg font-semibold">播放列表</h4>
            <div className="mr-auto">(共{playlist.length}首)</div>
            <button
              onClick={clearPlaylist}
              className="flex items-center text-indigo-600 px-1 py-0.5"
            >
              <FluentDelete />
              <span>清空列表</span>
            </button>
            <button
              title="关闭"
              onClick={() => setOpen(false)}
              className="hover:text-indigo-600 ml-1 text-2xl"
            >
              <RoundClose />
            </button>
          </div>
          <div
            id="playlist-table"
            className="overflow-auto min-w-full divide-y-2 divide-gray-200 text-sm dark:divide-gray-700"
          >
            <table>
              <thead>
                <tr>
                  <th className="px-2 py-1 text-center">#</th>
                  <th className="px-2 py-1 text-left">歌曲</th>
                  <th className="px-2 py-1 text-left">歌手</th>
                  <th className="px-2 py-1 text-left">时长</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {playlist.map((m, index) => (
                  <tr key={m.rid} className="cursor-pointer">
                    <td className="pr-1 py-1 font-medium text-gray-900 dark:text-white">
                      <div className="text-lg flex justify-end items-center gap-1.5">
                        {currentPlay?.rid === m.rid &&
                          (playing ? (
                            <PlayingIcon className="text-sm text-indigo-600" />
                          ) : (
                            <Pause className="text-sm text-indigo-600" />
                          ))}
                        <button
                          title="播放"
                          className="hover:text-indigo-600"
                          onClick={() => setCurrentPlayIndex(index)}
                        >
                          <Play />
                        </button>
                        {/* <button title="下载" className="hover:text-indigo-600">
                          <FluentArrowDownload />
                        </button> */}
                        {musicLikeIds.includes(m.rid) ? (
                          <button
                            title="取消喜欢"
                            onClick={() => removeLikeMusic(m)}
                            className="text-red-400"
                          >
                            <FluentHeart />
                          </button>
                        ) : (
                          <button title="喜欢" onClick={() => addLikeMusic(m)}>
                            <FluentHeart />
                          </button>
                        )}
                        <button
                          title="移除"
                          className="hover:text-indigo-600"
                          onClick={() => removePlaylistMusic(m)}
                        >
                          <FluentDelete />
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-1" title={m.name}>
                      <div className="w-20 md:w-48 truncate">{m.name}</div>
                    </td>
                    <td className="px-2 py-1" title={m.artist}>
                      <div className="w-16 truncate">{m.artist}</div>
                    </td>
                    <td className="px-2 py-1">
                      <div className="w-11 truncate">{m.songTimeMinutes}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>,
        document.body
      )}
      <button
        title="播放列表"
        className={`text-2xl ${open ? 'text-indigo-600' : ' '}`}
        onClick={() => setOpen((o) => !o)}
      >
        <PlayListIcon />
      </button>
    </div>
  )
}

export default memo(PlayList)
