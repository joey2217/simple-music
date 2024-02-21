import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { usePlayer } from '../../../context/PlayerContext'
import {
  PlayListIcon,
  FluentDelete,
  FluentArrowDownload,
  PlayingIcon,
} from '../../../components/Icons'
import type { Music } from '../../../types/player'

interface Props {
  item: Music
  index: number
}

const PlayListRow: React.FC<Props> = ({ item, index }) => {
  const { play, current, removeFromPlayerList, download } = usePlayer()
  return (
    <tr className="play-list-row" onDoubleClick={() => play(item)}>
      <th className="text-center">
        {current?.copyrightId === item.copyrightId ? <PlayingIcon /> : index}
      </th>
      <td>
        <div className="flex items-center gap-1">
          <div>
            <img
              src={item.pic}
              className="w-10 h-10 rounded"
              alt={item.title}
            />
          </div>
          <div className="w-60 truncate">
            <div className="w-60 truncate text-sm">{item.title}</div>
            <div className="w-60 truncate text-neutral-content">
              {item.artists.map((a) => a.name).join('/')}
            </div>
          </div>
        </div>
      </td>
      <td className="text-base flex gap-1">
        <button onClick={() => download(item)}>
          <FluentArrowDownload />
        </button>
        <button onClick={() => removeFromPlayerList(item)}>
          <FluentDelete />
        </button>
      </td>
    </tr>
  )
}

const PlayList: React.FC = () => {
  const { playList } = usePlayer()
  const [show, setShow] = useState(false)
  return (
    <div className="h-full flex items-center justify-center">
      <button
        className={`text-2xl btn  ${show ? 'btn-primary' : ''}`}
        onClick={() => setShow((s) => !s)}
      >
        <PlayListIcon />
      </button>
      {ReactDOM.createPortal(
        <div
          id="play-list"
          className="fixed right-0 z-50 p-2 bg-neutral rounded-md shadow-md"
          style={{
            transform: show ? 'translateX(0)' : 'translateX(100%)',
            transitionDuration: '300ms',
          }}
        >
          <div>
            <h2 className="text-lg font-semibold">播放列表</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <tbody>
                {playList.map((item, index) => (
                  <PlayListRow
                    key={item.copyrightId}
                    item={item}
                    index={index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default PlayList
