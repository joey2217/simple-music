import React from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetchRankingList } from '../../api/migu'
import type { AlbumImg, ColumnInfo } from '../../types/migu'
import { usePlayer } from '../../context/PlayerContext'
import { columnContent2Music } from '../../utils/player'
import { PlayIcon, FluentAdd } from '../../components/Icons'
import { Button } from '@/components/ui/button'
import { Download, ListPlus, ListVideo } from 'lucide-react'
import { useDownload } from '@/main/store/download'
import LazyImage from '@/main/components/LazyLoadImage'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export const topListLoader: LoaderFunction = ({ params }) => {
  if (params.id) {
    return fetchRankingList(params.id)
  }
  throw new Response('Not Found', { status: 404 }) // 404
}

const AlbumImage: React.FC<{ albumImgList: AlbumImg[] }> = ({
  albumImgList,
}) => {
  const albumImg = albumImgList[albumImgList.length - 1]
  if (albumImg) {
    return (
      <LazyImage
        src={albumImg.webpImg}
        alt="album"
        className="w-10 h-10 rounded-md"
      />
    )
  }
  return null
}

const TopList: React.FC = () => {
  const data = useLoaderData() as ColumnInfo
  const { play, addToPlayList } = usePlayer()
  const download = useDownload()

  return (
    <div
      className="py-2 px-4 w-full scrollbar overflow-auto"
      style={{
        height: 'calc(100vh - 140px)',
      }}
    >
      <div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-bold mb-4">{data.columnTitle}</h1>
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
          <Popover>
            <PopoverTrigger>
              <LazyImage
                src={data.columnPicUrl}
                alt={data.columnTitle}
                className="h-20"
              />
            </PopoverTrigger>
            <PopoverContent>
              <p>{data.columnDes}</p>
            </PopoverContent>
          </Popover>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">#</TableHead>
              <TableHead className="max-w-96">标题</TableHead>
              <TableHead>操作</TableHead>
              <TableHead className="max-w-32">专辑</TableHead>
              <TableHead>时长</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.contents.map((item, index) => (
              <TableRow key={item.contentId}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 max-w-96">
                    <AlbumImage albumImgList={item.objectInfo.albumImgs} />
                    <div className="truncate flex-1">
                      <div className="truncate font-semibold text-base">
                        {item.objectInfo.songName}
                      </div>
                      <div className="truncate">{item.objectInfo.singer}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 text-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => play(columnContent2Music(item))}
                      title="播放"
                    >
                      <PlayIcon />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => addToPlayList(columnContent2Music(item))}
                      title="添加到播放列表"
                    >
                      <FluentAdd />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => download(columnContent2Music(item))}
                      title="下载"
                    >
                      <Download size={16} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell title={item.objectInfo.album} className="max-w-32">
                  <div className="truncate">{item.objectInfo.album}</div>
                </TableCell>
                <TableCell>{item.objectInfo.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TopList
