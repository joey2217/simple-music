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
} from '../components/Icons'
import Image from '@/main/components/LazyLoadImage'
import { Button } from '@/components/ui/button'

interface Props {
  item: Music
  index: number
}

const PlayListRow: React.FC<Props> = ({ item, index }) => {
  const download = useDownload()
  const { play, removeFromPlayerList } = usePlayer()
  return (
    <TableRow className="play-list-row" onDoubleClick={() => play(item)}>
      <TableCell className="text-center">{index}</TableCell>
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
        <div>
            <h1 className="text-xl font-bold mb-4">最近播放</h1>
            <div className="flex gap-2 mb-3">
              <Button
                variant="default"
                size="sm"
                onClick={() =>
                  addToPlayList(data.contents.map(columnContent2Music), true)
                }
              >
                <ListVideo className="mr-2" />
                <span>播放全部</span>
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  addToPlayList(data.contents.map(columnContent2Music))
                }
              >
                <ListPlus className="mr-2" />
                <span>添加到播放列表</span>
              </Button>
            </div>
          </div>
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
