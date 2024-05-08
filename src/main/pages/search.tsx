import React, { useMemo } from 'react'
import { type LoaderFunction, useLoaderData, Link } from 'react-router-dom'
import { fetchSearchData } from '../api/migu'
import type { SearchSinger, SongItem } from '../types/migu'
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
import MusicTitleCell from '../components/MusicTitleCell'
import ActionCell from '../components/ActionCell'
import Pagination from '../components/Pagination'

const PAGE_SIZE = 30

export const searchLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams
  const keyword = searchParams.get('keyword')
  if (keyword) {
    const pageStr = searchParams.get('page')
    const pageNum = Number(pageStr) || 1
    return fetchSearchData(keyword, pageNum, PAGE_SIZE).then((data) => {
      const {
        bestShow: { bestShowSinger },
        songsData: { items, total },
      } = data
      return {
        bestShowSinger,
        items,
        page: pageNum,
        keyword,
        total,
      }
    })
  }
  throw new Response('Not Found', { status: 404 }) // 404
}

const Search: React.FC = () => {
  const {
    keyword,
    bestShowSinger: singer,
    items,
    page,
    total,
  } = useLoaderData() as {
    bestShowSinger?: SearchSinger
    items: SongItem[]
    page: number
    total: number
    keyword: string
  }

  const musicList = useMemo(() => items.map(songItem2Music), [items])

  return (
    <div className="page">
      <div className="flex items-baseline gap-4 mb-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {keyword}
        </h4>
        <span>的相关搜索:</span>
      </div>
      {singer && (
        <Link to={`/artist/${singer.id}`} className="flex gap-3 mb-6">
          <Image
            src={singer.smallPic}
            alt={singer.name}
            className="w-16 h-16 rounded-md"
          />
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {singer.name}
            </h4>
            <div className="flex gap-8">
              <span>单曲：{singer.songNum}</span>
              <span>专辑：{singer.albumNum}</span>
            </div>
          </div>
        </Link>
      )}
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
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <MusicTitleCell music={song} />
              </TableCell>
              <TableCell>
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
        urlFormat={(p) => `/search?keyword=${keyword}&page=${p}`}
      />
    </div>
  )
}

export default Search
