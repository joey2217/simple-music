import React from 'react'
import { Link, useLoaderData, type LoaderFunction } from 'react-router-dom'
import { fetchArtistSong } from '../../api/migu'
import type { PageData, SongItem } from '../../types/migu'
import { songItem2Music } from '../../utils/player'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Pagination from '@/main/components/Pagination'
import MusicTitleCell from '@/main/components/MusicTitleCell'
import ActionCell from '@/main/components/ActionCell'

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

  const musicList = data.items.map((song) => songItem2Music(song))

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
          {musicList.map((song, index) => (
            <TableRow key={song.copyrightId}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>
                <MusicTitleCell music={song} />
              </TableCell>
              <TableCell className="flex gap-1 items-center">
                <ActionCell music={song} />
              </TableCell>
              <TableCell title={song.album} className="max-w-32 truncate">
                <Link className="truncate link" to={`/album/${song.albumId}`}>
                  {song.album}
                </Link>
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
