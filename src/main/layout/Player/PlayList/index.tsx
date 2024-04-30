import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { usePlayer } from '../../../context/PlayerContext'
import {
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
import { ListMusic, Play } from 'lucide-react'

interface Props {
  item: Music
  index: number
}

const PlayListRow: React.FC<Props> = ({ item }) => {
  const download = useDownload()
  const { play, current, removeFromPlayerList } = usePlayer()

  const playing = current?.copyrightId === item.copyrightId

  return (
    <TableRow className="play-list-row" onDoubleClick={() => play(item)}>
      <TableCell className={`group ${playing ? 'text-primary' : ''}`}>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Image
              src={item.pic}
              className="w-10 h-10 rounded-md"
              alt={item.title}
            />
            <div
              className={`absolute left-0 top-0 w-full h-full flex justify-center items-center ${
                playing ? 'opacity-100' : 'opacity-0'
              } group-hover:opacity-100 transition-opacity duration-300 cursor-pointer`}
              onClick={() => play(item)}
            >
              <Play />
            </div>
          </div>
          <div className="w-60 truncate">
            <div className="w-60 truncate text-base">{item.title}</div>
            <div className="w-60 truncate text-sm text-neutral-content">
              {item.artists.map((a) => a.name).join('/')}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-1.5 text-lg">
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
  const { playList, clearPlayList, current } = usePlayer()
  const download = useDownload()
  const [show, setShow] = useState(false)
  return (
    <div className="h-full flex items-center justify-center gap-4">
      <Button
        size="icon"
        variant="outline"
        disabled={current == null}
        onClick={() => download(current!)}
      >
        <FluentArrowDownload />
      </Button>
      <Button
        variant={show ? 'default' : 'ghost'}
        size="icon"
        onClick={() => setShow((s) => !s)}
      >
        <ListMusic />
      </Button>
      {ReactDOM.createPortal(
        <div
          id="play-list"
          className="scrollbar fixed right-0 z-50 p-2 rounded-md shadow-md bg-background/95  select-none"
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
