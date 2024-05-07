import React from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import { fetchArtistSong } from '../../api/migu'
import type { PageData, SongItem } from '../../types/migu'
import { songItem2Music } from '../../utils/player'
import { FluentAdd, PlayIcon } from '../../components/Icons'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button, buttonVariants } from '@/components/ui/button'
import Image from '@/main/components/Image'
import Pagination from '@/main/components/Pagination'
import LikeButton from '@/main/components/buttons/LikeButton'
import { Download } from 'lucide-react'
import { useDownload } from '@/main/store/download'
import { usePlaylist } from '@/main/store/playlist'

const PAGE_SIZE = 30
const SAM = '100'

export const artistSongLoader: LoaderFunction = async ({ params, request }) => {
  const { id } = params
  const url = new URL(request.url)
  const pageStr = url.searchParams.get('page')
  if (id) {
    const page = Number(pageStr) || 1
    return fetchArtistSong(id, page, SAM, PAGE_SIZE).then((data) => {
      return {
        data: data.song,
        id,
        page,
        total: data.song.total,
      }
    })
  }
  throw new Response('数据不存在', { status: 404 }) // 404
}

const Song: React.FC = () => {
  const { data, id, page, total } = useLoaderData() as {
    data: PageData<SongItem>
    page: number
    total: number
    id: string
  }
  const { play, addToPlayList } = usePlaylist()
  const download = useDownload()

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
          {data.items.map((song, index) => (
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
                  <LikeButton
                    className={buttonVariants({
                      size: 'icon',
                      variant: 'ghost',
                    })}
                    item={songItem2Music(song)}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => download(songItem2Music(song))}
                    title="下载"
                  >
                    <Download size={16} />
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
      <Pagination
        total={total}
        current={page}
        size={PAGE_SIZE}
        urlFormat={(p) => `/artist/${id}?page=${p}`}
      />
    </>
  )
}

export default Song
