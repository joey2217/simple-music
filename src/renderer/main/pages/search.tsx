import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchSearchData } from '../api/migu'
import type { SearchSinger, SongItem } from '../types/migu'
import { useState } from 'react'

const Search: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '')
  const [singer, setSinger] = useState<SearchSinger>()
  const [songList, setSingList] = useState<SongItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchSearchData(keyword)
      .then((data) => {
        const {
          bestShow: { bestShowSinger },
          songsData: { items, total },
        } = data
        setSinger(bestShowSinger)
        setSingList(items)
        setTotal(total)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [keyword])

  return (
    <div>
      <div>{singer && <div>{singer.name}</div>}</div>
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
                  <td>{song.id}</td>
                  <td>{song.copyrightId}</td>
                  <td>{song.name}</td>
                  <td>{song.singers.map((s) => s.name).join()}</td>
                  <td>{song.album.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Search
