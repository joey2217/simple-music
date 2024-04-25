import React from 'react'
import { useRecentListStore } from '../store/playlist'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Music } from '../types/player'
import { useDownload } from '../store/download'
import { usePlayer } from '../context/PlayerContext'
import {
  FluentArrowDownload,
  FluentDelete,
  PlayingIcon,
} from '../components/Icons'
import Image from '@/main/components/Image'

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
          <Image
            src={item.pic}
            className="w-10 h-10 rounded-md"
            alt={item.title}
          />
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

const Recent: React.FC = () => {
  const list = useRecentListStore((s) => s.recent)
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-center">#</TableHead>
            <TableHead className="max-w-96">标题</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <PlayListRow key={item.copyrightId} item={item} index={index + 1} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Recent
