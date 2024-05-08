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
import { songItem2Music } from '../../utils/player'
import Pagination from '@/main/components/Pagination'
import { usePlayerList } from '@/main/store/player'
import MusicTitleCell from '@/main/components/MusicTitleCell'
import ActionCell from '@/main/components/ActionCell'
import PlayAllButton from '@/main/components/buttons/PlayAllButton'
import AppendPlayerListButton from '@/main/components/buttons/AppendPlayerListButton'

const PAGE_SIZE = 20

export const SongListContentLoader: LoaderFunction = async ({ params }) => {
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

const SongListContent: React.FC = () => {
  const { items, total, page, playlistId } = useLoaderData() as {
    items: SongItem[]
    total: number
    page: number
    playlistId: string
  }
  const { play } = usePlayerList()

  const musicList = items.map((song) => ({
    ...songItem2Music(song),
    duration: song.duration,
  }))

  return (
    <>
      <div className="flex gap-2 my-3">
        <PlayAllButton items={musicList} />
        <AppendPlayerListButton items={musicList} />
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
          {musicList.map((song, index) => {
            return (
              <TableRow key={song.copyrightId} onDoubleClick={() => play(song)}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>
                  <MusicTitleCell music={song} />
                </TableCell>
                <TableCell>
                  <ActionCell music={song} />
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
        urlFormat={(p) => `/song-list/${playlistId}/${p}`}
      />
    </>
  )
}

export default SongListContent
