import React from 'react'
import { Link, useLoaderData, type LoaderFunction } from 'react-router'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetchRankingList } from '../../api/migu'
import type { ColumnInfo } from '../../types/migu'
import { columnContent2Music } from '../../utils/player'
import { Button } from '@/components/ui/button'
import { ListPlus, ListVideo } from 'lucide-react'
import LazyImage from '@/main/components/LazyLoadImage'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { usePlayerList } from '@/main/store/player'
import MusicTitleCell from '@/main/components/MusicTitleCell'
import ActionCell from '@/main/components/ActionCell'

export const topListLoader: LoaderFunction = ({ params }) => {
  if (params.id) {
    return fetchRankingList(params.id)
  }
  throw new Response('Not Found', { status: 404 }) // 404
}

const TopList: React.FC = () => {
  const data = useLoaderData() as ColumnInfo
  const { addToPlayList } = usePlayerList()

  const musicList = data.contents.map((m) => ({
    ...columnContent2Music(m),
    duration: m.objectInfo.length,
  }))

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
            {musicList.map((item, index) => {
              return (
                <TableRow key={item.copyrightId || index}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    <MusicTitleCell music={item} />
                  </TableCell>
                  <TableCell>
                    <ActionCell music={item} />
                  </TableCell>
                  <TableCell title={item.album} className="max-w-32 truncate">
                    <Link
                      className="truncate link"
                      to={`/album/${item.albumId}`}
                    >
                      {item.album}
                    </Link>
                  </TableCell>
                  <TableCell>{item.duration}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TopList
