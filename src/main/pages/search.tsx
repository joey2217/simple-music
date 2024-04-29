import React, { useCallback, useEffect, useState } from 'react'
import { type LoaderFunction, useLoaderData, Link } from 'react-router-dom'
import { fetchSearchData } from '../api/migu'
import type { SearchSinger, SongItem } from '../types/migu'
import { usePlayer } from '../context/PlayerContext'
import { songItem2Music } from '../utils/player'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { FluentAdd, PlayIcon } from '../components/Icons'
import Image from '../components/Image'
import LoadMore from '../components/LoadMore'

export const searchLoader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams
  console.log(searchParams.get('keyword'), url.toString())
  return searchParams.get('keyword')
}

const PAGE_SIZE = 30

const Search: React.FC = () => {
  const keyword = useLoaderData() as string | null
  const { play, addToPlayList } = usePlayer()
  const [singer, setSinger] = useState<SearchSinger>()
  const [songList, setSingList] = useState<SongItem[]>([])
  const [page, setPage] = useState(0)
  const [finished, setFinished] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (keyword) {
      setPage(1)
      setLoading(true)
      fetchSearchData(keyword, 1, PAGE_SIZE)
        .then((data) => {
          const {
            bestShow: { bestShowSinger },
            songsData: { items },
          } = data
          setSinger(bestShowSinger)
          setSingList(items)
          setFinished(items.length < PAGE_SIZE)
        })
        .catch((err) => {
          console.error(err)
          setFinished(true)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [keyword])

  const loadMore = useCallback(() => {
    if (keyword) {
      const nextPage = page + 1
      setLoading(true)
      setPage(page)
      fetchSearchData(keyword, nextPage, PAGE_SIZE)
        .then((data) => {
          const {
            bestShow: { bestShowSinger },
            songsData: { items },
          } = data
          setSinger(bestShowSinger)
          setSingList((l) => l.concat(items))
          setFinished(items.length < PAGE_SIZE)
        })
        .catch((err) => {
          console.error(err)
          setFinished(true)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [keyword, page])

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
          {songList.map((song, index) => (
            <TableRow key={song.copyrightId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 max-w-96">
                  <Image src={song.smallPic} className="w-10 h-10 rounded-md" />
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
              <TableCell>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => play(songItem2Music(song))}
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
              </TableCell>
              <TableCell>{song.album?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <LoadMore loadMore={loadMore} finished={finished} />
    </div>
  )
}

export default Search
