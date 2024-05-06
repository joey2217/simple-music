import {
  getPlaylistMusicsById,
  usePlaylists,
} from '@/main/context/PlaylistContext'
import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import MusicTable from '@/main/components/MusicTable'
import PlayAllButton from '@/main/components/buttons/PlayAllButton'
import AddPlayListButton from '@/main/components/buttons/AddPlayListButton'
import { FilePenLine } from 'lucide-react'
import LazyImage from '@/main/components/LazyLoadImage'

//  let revalidator = useRevalidator();

const LikePlaylist: React.FC = () => {
  const { id } = useParams()
  const { playlistList } = usePlaylists()

  const list = useMemo(() => (id ? getPlaylistMusicsById(id) : []), [id])
  const current = useMemo(
    () => playlistList.find((p) => p.id === id),
    [id, playlistList]
  )

  return (
    <div className="page">
      <div className="flex gap-4">
        <LazyImage
          src={current?.cover}
          className="w-32 aspect-square rounded"
        />
        <div className="space-y-2">
          <h1 className="text-xl font-bold mb-4 flex gap-3">
            <span>{current?.title}</span>
            <Link to={`/pl/${id}/edit`} title="编辑">
              <FilePenLine />
            </Link>
          </h1>
          <p>{current?.desc}</p>
          <div className="flex gap-2 mb-3">
            <PlayAllButton items={list} />
            <AddPlayListButton items={list} />
          </div>
        </div>
      </div>
      <MusicTable items={list} />
    </div>
  )
}

export default LikePlaylist
