import React, { useCallback, useEffect, useState } from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import { fetchPlaylistInfo, fetchPlaylistSongs } from '../api/migu'
import type { PlaylistInfo, SongItem } from '../types/migu'
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
import { PlayIcon } from '@radix-ui/react-icons'
import { FluentAdd } from '../components/Icons'
import { usePlayer } from '../context/PlayerContext'
import { songItem2Music } from '../utils/player'
import LoadMore from '../components/LoadMore'

export const playlistPageLoader: LoaderFunction = ({ params }) => {
  if (params.playlistId) {
    return fetchPlaylistInfo(params.playlistId).then((data) => ({
      data,
      playlistId: params.playlistId,
    }))
  }
  throw new Response('Not Found', { status: 404 }) // 404
}

const PAGE_SIZE = 20

const PlaylistPage: React.FC = () => {
  const { data, playlistId } = useLoaderData() as {
    data: PlaylistInfo
    playlistId: string
  }
  const [items, setItems] = useState<SongItem[]>([])
  const { play, addToPlayList } = usePlayer()
  const [finished, setFinished] = useState(false)
  const [pageNum, setPageNum] = useState(1)

  const loadMore = useCallback(() => {
    if (!finished) {
      setPageNum((p) => p + 1)
    }
  }, [finished])

  useEffect(() => {
    fetchPlaylistSongs(playlistId, pageNum, PAGE_SIZE).then((data) => {
      setFinished(
        data.total > data.items.length ? data.items.length < PAGE_SIZE : true
      )
      setItems((l) => l.concat(data.items))
    })
  }, [pageNum, playlistId])

  return (
    <div>
      <div className="flex gap-2">
        <img
          src={data.image}
          alt={data.playListName}
          className="w-16 h-16 rounded-md"
        />
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {data.playListName}
          </h4>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            {data.summary}
          </blockquote>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-center">#</TableHead>
            <TableHead className="max-w-96">标题</TableHead>
            <TableHead>操作</TableHead>
            <TableHead>时长</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((song, index) => (
            <TableRow key={song.copyrightId}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Image
                    src={song.smallPic}
                    alt="album"
                    className="w-10 h-10 rounded"
                  />
                  <div className="truncate flex-1">
                    <div className="truncate font-semibold text-base">
                      {song.name}
                    </div>
                    <div className="truncate">
                      {song.singers.map((s) => s.name).join('/')}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="flex gap-1 items-center">
                <div className="flex gap-2 text-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => play(songItem2Music(song))}
                    title="播放"
                  >
                    <PlayIcon />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => addToPlayList(songItem2Music(song))}
                    title="添加到播放列表"
                  >
                    <FluentAdd />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{song.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <LoadMore loadMore={loadMore} finished={finished} />
    </div>
  )
}

export default PlaylistPage
