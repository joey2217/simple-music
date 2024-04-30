import { useLikeStore } from '@/main/store/like'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Download, ListPlus, ListVideo, Trash2 } from 'lucide-react'
import LazyImage from '@/main/components/LazyLoadImage'
import { usePlayer } from '@/main/context/PlayerContext'
import { useDownload } from '@/main/store/download'
import { FluentAdd, PlayIcon } from '@/main/components/Icons'

const Like: React.FC = () => {
  const musicList = useLikeStore((s) => s.musicList)
  const removeLikeMusic = useLikeStore((s) => s.removeLikeMusic)
  const { play, addToPlayList } = usePlayer()
  const download = useDownload()
  return (
    <div className="page">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold mb-4">我喜欢的音乐</h1>
          <div className="flex gap-2 mb-3">
            <Button
              variant="default"
              size="sm"
              onClick={() => addToPlayList(musicList, true)}
            >
              <ListVideo className="mr-2" />
              <span>播放全部</span>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => addToPlayList(musicList)}
            >
              <ListPlus className="mr-2" />
              <span>添加到播放列表</span>
            </Button>
          </div>
        </div>
      </div>
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
          {musicList.map((item, index) => (
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
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeLikeMusic(item)}
                    title="取消喜欢"
                  >
                    <Trash2 size={16} />
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
    </div>
  )
}

export default Like
