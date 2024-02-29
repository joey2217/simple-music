import React, { useEffect, useState } from 'react'
import { type LoaderFunction, useLoaderData } from 'react-router-dom'
import { fetchSearchData } from '../api/migu'
import type { SongItem } from '../types/migu'
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
import { PlayIcon } from '../components/Icons'

export const searchLoader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams
  console.log(searchParams.get('keyword'), url.toString())
  return searchParams.get('keyword')
}

const Search: React.FC = () => {
  const keyword = useLoaderData() as string | null
  const { play } = usePlayer()
  // const [keyword, setKeyword] = useState(searchParams.get('keyword') || '')
  // const [singer, setSinger] = useState<SearchSinger>()
  const [songList, setSingList] = useState<SongItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (keyword) {
      fetchSearchData(keyword)
        .then((data) => {
          const {
            // bestShow: { bestShowSinger },
            songsData: { items, total },
          } = data
          // setSinger(bestShowSinger)
          setSingList(items)
          setTotal(total)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [keyword])

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-center">#</TableHead>
            <TableHead className="max-w-96">标题</TableHead>
            <TableHead>操作</TableHead>
            <TableHead className="max-w-32">专辑</TableHead>
            <TableHead>时长</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songList.map((song) => (
            <TableRow key={song.copyrightId}>
              <TableCell>{song.name}</TableCell>
              <TableCell>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => play(songItem2Music(song))}
                >
                  <PlayIcon />
                </Button>
              </TableCell>
              <TableCell>{song.singers.map((s) => s.name).join()}</TableCell>
              <TableCell>{song.album?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {total}
    </div>
  )
}

export default Search
