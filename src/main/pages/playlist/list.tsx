import { fetchPlaylistSongs } from '@/main/api/migu'
import { SongItem } from '@/main/types/migu'
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
import { Button, buttonVariants } from '@/components/ui/button'
import { PlayIcon } from '@radix-ui/react-icons'
import { FluentAdd } from '../../components/Icons'
import { usePlayer } from '../../context/PlayerContext'
import { songItem2Music } from '../../utils/player'
import LikeButton from '../../components/buttons/LikeButton'
import { Download, SquarePlus } from 'lucide-react'
import { useDownload } from '../../store/download'
import { usePlaylists } from '../../context/PlaylistContext'
import Pagination from '@/main/components/Pagination'

const PAGE_SIZE = 20

export const playlistContentLoader: LoaderFunction = async ({ params }) => {
  const { playlistId, page } = params
  if (playlistId) {
    const pageNum = page ? Number(page) || 1 : 1
    return fetchPlaylistSongs(playlistId, pageNum, PAGE_SIZE).then((data) => ({
      items: data.items,
      total: data.total,
      page: pageNum,
      playlistId,
    }))
  }
  throw new Response('Not Found', { status: 404 }) // 404
}

const PlaylistContent: React.FC = () => {
  const { items, total, page, playlistId } = useLoaderData() as {
    items: SongItem[]
    total: number
    page: number
    playlistId: string
  }
  const { play, addToPlayList } = usePlayer()
  const download = useDownload()
  const { saveToPlaylist } = usePlaylists()

  return (
    <>
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
          {items.map((song, index) => {
            const m = songItem2Music(song)
            return (
              <TableRow key={song.copyrightId}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {/* <Image
                src={song.smallPic}
                alt="album"
                className="w-10 h-10 rounded"
              /> */}
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
                      onClick={() => play(m)}
                      title="播放"
                    >
                      <PlayIcon />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => addToPlayList(m)}
                      title="添加到播放列表"
                    >
                      <FluentAdd />
                    </Button>
                    <LikeButton
                      className={buttonVariants({
                        size: 'icon',
                        variant: 'ghost',
                      })}
                      item={m}
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => saveToPlaylist(m)}
                    >
                      <SquarePlus />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => download(m)}
                      title="下载"
                    >
                      <Download size={16} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{song.duration}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination
        total={total}
        current={page}
        size={PAGE_SIZE}
        urlFormat={(p) => `/playlist/${playlistId}/${p}`}
      />
    </>
  )
}

export default PlaylistContent
