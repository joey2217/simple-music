import React from 'react'
import type { Music } from '../types/player'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Download } from 'lucide-react'
import LazyImage from '@/main/components/LazyLoadImage'
import { usePlayer } from '@/main/context/PlayerContext'
import { useDownload } from '@/main/store/download'
import { FluentAdd, PlayIcon } from '@/main/components/Icons'
import LikeButton from './buttons/LikeButton'

interface Props {
  items: Music[]
}

const MusicTable: React.FC<Props> = ({ items }) => {
  const { play, addToPlayList } = usePlayer()
  const download = useDownload()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">#</TableHead>
          <TableHead className="max-w-96">标题</TableHead>
          <TableHead>操作</TableHead>
          <TableHead className="max-w-32">专辑</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={item.copyrightId} onDoubleClick={() => play(item)}>
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2 max-w-96">
                <LazyImage
                  src={item.pic}
                  alt="album"
                  className="w-10 h-10 rounded-md"
                />
                <div className="truncate flex-1">
                  <div className="truncate font-semibold text-base">
                    {item.title}
                  </div>
                  <div className="truncate">{item.artist}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-1 text-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => play(item)}
                  title="播放"
                >
                  <PlayIcon />
                </Button>
                <LikeButton
                  item={item}
                  className={buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  })}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => addToPlayList(item)}
                  title="添加到播放列表"
                >
                  <FluentAdd />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => download(item)}
                  title="下载"
                >
                  <Download size={16} />
                </Button>
              </div>
            </TableCell>
            <TableCell title={item.album} className="max-w-32">
              <div className="truncate">{item.album}</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default MusicTable
