import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSongListDetail } from '../../api/songList'
import type { Music } from '../../types'
import type { SongListDetail } from '../../types/songList'
import MusicPage from '../../components/MusicPage'
import { FluentAdd, Play } from '../../components/icons'
import { usePlaylist } from '../../store/hooks'

const SongListDetailPage: React.FC = () => {
  const { id } = useParams()
  const { addPlaylist } = usePlaylist()
  const [list, setList] = useState<Music[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [songListDetail, setSongListDetail] = useState<SongListDetail | null>(
    null
  )

  useEffect(() => {
    if (id) {
      fetchSongListDetail(id as string, { pn: page }).then((data) => {
        setList(data.musicList)
        setSongListDetail(data)
        setTotal(data.total)
      })
    }
  }, [id, page])

  if (songListDetail) {
    return (
      <div>
        <div className="flex mb-4 gap-4 items-start flex-wrap">
          <img
            src={songListDetail.img}
            alt={songListDetail.name}
            className="rounded max-w-xs flex-shrink-0"
          />
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl">{songListDetail.name}</h2>
            <p className="text-gray-300 ">{songListDetail.info}</p>
            <div className="text-blue-600">{songListDetail.tag}</div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => addPlaylist(list, { reset: true })}
                className="primary-btn"
              >
                <Play />
                <span>播放全部</span>
              </button>
              <button
                className="default-btn"
                onClick={() => addPlaylist(list)}
              >
                <FluentAdd />
                <span>添加</span>
              </button>
            </div>
          </div>
        </div>
        <MusicPage list={list} total={total} onPageChange={setPage} />
      </div>
    )
  }
  return null
}

export default memo(SongListDetailPage)
