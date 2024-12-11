import React from 'react'
import { Link, useLoaderData, type LoaderFunction } from 'react-router'
import { fetchAlbum } from '../api/migu'
import type { AlbumInfo } from '../types/migu'
import { songItem2Music } from '../utils/player'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from '../components/Image'
import { Button, buttonVariants } from '@/components/ui/button'
import { ListPlus, ListVideo } from 'lucide-react'
import { usePlayerList } from '../store/player'
import ActionCell from '../components/ActionCell'
import MusicTitleCell from '../components/MusicTitleCell'

export const albumLoader: LoaderFunction = ({ params }) => {
  if (params.id) {
    return fetchAlbum(params.id)
  }
  throw new Response('Not Found', { status: 404 }) // 404
}

const Album: React.FC = () => {
  const { detailInfo, songs } = useLoaderData() as AlbumInfo
  const { addToPlayList } = usePlayerList()

  const musicList = songs.items.map((s) => songItem2Music(s))

  return (
    <div className="page">
      <div className="flex gap-2 mb-2">
        <Image
          src={detailInfo.mediumPic}
          alt={detailInfo.name}
          className="w-24 aspect-square rounded-md"
        />
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">{detailInfo.name}</h1>
          <div className="flex gap-4 items-center">
            <h2 className="text-base divide-x">
              {detailInfo.singers.map((s) => (
                <Link
                  to={`/artist/${s.id}`}
                  key={s.id}
                  className={buttonVariants({ variant: 'link' })}
                >
                  {s.name}
                </Link>
              ))}
            </h2>
            <span className="text-muted-foreground text-sm">
              {detailInfo.publishDate} 发布
            </span>
          </div>
          <div className="flex gap-2 mb-3">
            <Button
              variant="default"
              size="sm"
              onClick={() =>
                addToPlayList(songs.items.map(songItem2Music), true)
              }
            >
              <ListVideo className="mr-2" />
              <span>播放全部</span>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => addToPlayList(songs.items.map(songItem2Music))}
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {musicList.map((item, index) => (
            <TableRow key={item.copyrightId}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="max-w-96 truncate">
                <MusicTitleCell music={item} />
              </TableCell>
              <TableCell>
                <ActionCell music={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Album
