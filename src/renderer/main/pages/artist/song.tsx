import React, { useCallback, useEffect, useState } from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import { fetchArtistSong } from '../../api/migu'
import type { PageData, SongItem } from '../../types/migu'
import { usePlayer } from '../../context/PlayerContext'
import { songItem2Music } from '../../utils/player'
import { FluentAdd, PlayIcon } from '../../components/Icons'
import LoadMore from '../../components/LoadMore'

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
    <div className="overflow-x-auto">
      <table className="table table-sm">
        <tbody>
          {list.map((song, index) => (
            <tr key={song.copyrightId}>
              <th>
                <div className="w-6 text-center">{index + 1}</div>
              </th>
              <td className="max-w-20 sm:max-w-40  md:max-w-60 lg:w-full">
                <div className="flex items-center gap-1">
                  <img
                    src={song.smallPic}
                    alt="album"
                    className="w-10 h-10 rounded"
                  />
                  <div className="truncate flex-1 font-semibold text-base">
                    {song.name}
                  </div>
                </div>
              </td>
              <td className="flex gap-1 items-center">
                <button
                  className="btn btn-xs btn-circle btn-outline"
                  onClick={() => play(songItem2Music(song))}
                  title="播放"
                >
                  <PlayIcon />
                </button>
                <button
                  className="btn btn-xs btn-circle btn-outline"
                  onClick={() => addToPlayList(songItem2Music(song))}
                  title="添加到播放列表"
                >
                  <FluentAdd />
                </button>
              </td>
              <td className="max-w-10 sm:max-w-20  md:max-w-40 lg:max-w-60 xl:max-w-80">
                <div className="truncate">
                  {song.singers.map((s) => s.name).join()}
                </div>
              </td>
              <td
                title={song.album?.name}
                className="max-w-10 sm:max-w-20 md:max-w-40 lg:max-w-60 xl:max-w-80"
              >
                <div className="truncate">{song.album?.name}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LoadMore loadMore={loadMore} finished={finished} />
    </div>
  )
}

export default Song
