import React, { useCallback, useEffect, useState } from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import { fetchArtistSong } from '../../api/migu'
import type { PageData, SongItem } from '../../types/migu'
import { usePlayer } from '../../context/PlayerContext'
import { songItem2Music } from '../../utils/player'
import { FluentAdd, PlayIcon } from '../../components/Icons'
import LoadMore from '../../components/LoadMore'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Image from '@/main/components/Image'

const PAGE_SIZE = 30
const SAM = '100'

export const artistSongLoader: LoaderFunction = async ({ params }) => {
  const { id } = params
  if (id) {
    return fetchArtistSong(id, 1, SAM, PAGE_SIZE).then((data) => {
      return {
        data: data.song,
        id,
        end: data.song.items.length < PAGE_SIZE,
      }
    })
  }
  throw new Response('数据不存在', { status: 404 }) // 404
}

const Song: React.FC = () => {
  const { data, id, end } = useLoaderData() as {
    data: PageData<SongItem>
    end: boolean
    id: string
  }
  const { play, addToPlayList } = usePlayer()

  const [list, setList] = useState(data.items)
  const [finished, setFinished] = useState(end)
  const [pageNum, setPageNum] = useState(1)

  const loadMore = useCallback(() => {
    if (!finished) {
      setPageNum((p) => p + 1)
    }
  }, [finished])

  useEffect(() => {
    if (pageNum > 1) {
      fetchArtistSong(id, pageNum, SAM, PAGE_SIZE).then((data) => {
        setFinished(data.song.items.length < PAGE_SIZE)
        setList((l) => l.concat(data.song.items))
      })
    }
  }, [id, pageNum])

  return (
    <>
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
          {list.map((song, index) => (
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
              <TableCell title={song.album?.name} className="max-w-32">
                <div className="truncate">{song.album?.name}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <LoadMore loadMore={loadMore} finished={finished} />
    </>
  )
}

export default Song
