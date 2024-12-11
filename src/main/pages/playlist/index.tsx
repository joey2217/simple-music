import {
  getPlaylistMusicsById,
  usePlaylists,
} from '@/main/context/PlaylistContext'
import React, { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import MusicTable from '@/main/components/MusicTable'
import PlayAllButton from '@/main/components/buttons/PlayAllButton'
import AppendPlayerListButton from '@/main/components/buttons/AppendPlayerListButton'
import { FilePenLine } from 'lucide-react'
import LazyImage from '@/main/components/LazyLoadImage'
import { Button } from '@/components/ui/button'
import { useApp } from '@/main/context/AppContext'

//  let revalidator = useRevalidator();

const Playlist: React.FC = () => {
  const { id } = useParams()
  const { playlistList, removePlaylist } = usePlaylists()
  const { confirm } = useApp()
  const navigate = useNavigate()

  const list = useMemo(() => (id ? getPlaylistMusicsById(id) : []), [id])
  const current = useMemo(
    () => playlistList.find((p) => p.id === id),
    [id, playlistList]
  )

  const remove = () => {
    confirm({
      title: '删除歌单',
      message: '确认删除该歌单?',
    })
      .then(() => {
        removePlaylist(id!)
        navigate('/', { replace: true })
      })
      .catch(() => {})
  }

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
            <Link to={`/playlist/${id}/edit`} title="编辑">
              <FilePenLine />
            </Link>
          </h1>
          <p>{current?.desc}</p>
          <div className="flex gap-2 mb-3">
            <PlayAllButton items={list} />
            <AppendPlayerListButton items={list} />
            <Button variant="destructive" onClick={remove}>
              删除歌单
            </Button>
          </div>
        </div>
      </div>
      <MusicTable items={list} />
    </div>
  )
}

export default Playlist
