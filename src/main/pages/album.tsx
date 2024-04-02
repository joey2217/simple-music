import React from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import { fetchAlbum } from '../api/migu'
import type { AlbumInfo } from '../types/migu'
import { usePlayer } from '../context/PlayerContext'
import { songItem2Music } from '../utils/player'
import { FluentAdd, PlayIcon } from '../components/Icons'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from '../components/Image'
import { Button } from '@/components/ui/button'

export const albumLoader: LoaderFunction = ({ params }) => {
  if (params.id) {
    return fetchAlbum(params.id)
  }
  throw new Response('Not Found', { status: 404 }) // 404
}

const Album: React.FC = () => {
  const { detailInfo, songs } = useLoaderData() as AlbumInfo
  const { play, addToPlayList } = usePlayer()

  return (
    <div>
      <div className="flex gap-2">
        <Image
          src={detailInfo.mediumPic}
          alt={detailInfo.name}
          className="w-20 h-20 rounded-md"
        />
        <div>
          <h1 className="text-xl font-semibold">{detailInfo.name}</h1>
          <h2 className="text-lg">
            {detailInfo.singers.map((s) => s.name).join('/')}
          </h2>
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
          {songs.items.map((item, index) => (
            <TableRow key={item.copyrightId}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="max-w-96 truncate">{item.name}</TableCell>
              <TableCell>
                <div className="flex gap-2 text-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => play(songItem2Music(item))}
                    title="播放"
                  >
                    <PlayIcon />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => addToPlayList(songItem2Music(item))}
                    title="添加到播放列表"
                  >
                    <FluentAdd />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Album
