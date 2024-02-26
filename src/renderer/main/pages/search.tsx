import React, { useEffect, useState } from 'react'
import {
  type LoaderFunction,
  useLoaderData,
} from 'react-router-dom'
import { fetchSearchData } from '../api/migu'
import type { SongItem } from '../types/migu'
import { usePlayer } from '../context/PlayerContext'
import { songItem2Music } from '../utils/player'

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
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            {/* <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead> */}
            <tbody>
              {/* row 1 */}
              {songList.map((song) => (
                <tr key={song.copyrightId}>
                  <td>{song.name}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => play(songItem2Music(song))}
                    >
                      播放
                    </button>
                  </td>
                  <td>{song.singers.map((s) => s.name).join()}</td>
                  <td>{song.album?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {total}
      </div>
    </div>
  )
}

export default Search
