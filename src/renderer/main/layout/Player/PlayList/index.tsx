import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { usePlayer } from '../../../context/PlayerContext'
import {
  PlayListIcon,
  FluentDelete,
  FluentArrowDownload,
  PlayingIcon,
  RoundClose,
} from '../../../components/Icons'
import type { Music } from '../../../types/player'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import Image from '@/main/components/Image'
import { Button } from '@/components/ui/button'
import { useDownload } from '@/main/store/download'

interface Props {
  item: Music
  index: number
}

const PlayListRow: React.FC<Props> = ({ item, index }) => {
  const download = useDownload()
  const { play, current, removeFromPlayerList } = usePlayer()
  return (
    <TableRow className="play-list-row" onDoubleClick={() => play(item)}>
      <TableCell className="text-center">
        {current?.copyrightId === item.copyrightId ? <PlayingIcon /> : index}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <div>
            <Image
              src={item.pic}
              className="w-10 h-10 rounded-md"
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
      </TableCell>
      <TableCell>
        <div className="flex gap-1 text-lg">
          <button onClick={() => download(item)}>
            <FluentArrowDownload />
          </button>
          <button onClick={() => removeFromPlayerList(item)}>
            <FluentDelete />
          </button>
        </div>
      </TableCell>
    </TableRow>
  )
}

const PlayList: React.FC = () => {
  const { playList, clearPlayList } = usePlayer()
  const [show, setShow] = useState(false)
  return (
    <div className="h-full flex items-center justify-center">
      <Button
        variant={show ? 'default' : 'ghost'}
        size="icon"
        onClick={() => setShow((s) => !s)}
      >
        <PlayListIcon className="text-2xl" />
      </Button>
      {ReactDOM.createPortal(
        <div
          id="play-list"
          className="fixed right-0 z-50 p-2 rounded-md shadow-md bg-background/95"
          style={{
            transform: show ? 'translateX(0)' : 'translateX(100%)',
            transitionDuration: '300ms',
          }}
        >
          <div className="flex gap-2">
            <h2 className="text-lg font-semibold mr-auto">播放列表</h2>
            <Button variant="link" onClick={clearPlayList}>
              清空
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setShow(false)}
            >
              <RoundClose className="text-lg" />
            </Button>
          </div>
          <Table>
            <TableBody>
              {playList.map((item, index) => (
                <PlayListRow
                  key={item.copyrightId}
                  item={item}
                  index={index + 1}
                />
              ))}
            </TableBody>
          </Table>
        </div>,
        document.body
      )}
    </div>
  )
}

export default PlayList
