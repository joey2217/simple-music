import React, { memo } from 'react'
import { useRecoilValueLoadable, useRecoilState } from 'recoil'
import { artistAlbumPageState, artistAlbumState } from './store'
import AlbumCard from '../../components/AlbumCard'
import Pagination from '../../components/Pagination'
import { LoadingIcon } from '../../components/icons'

const ArtistAlbum: React.FC = () => {
  const [page, setPage] = useRecoilState(artistAlbumPageState)
  const artistAlbumLoadable = useRecoilValueLoadable(artistAlbumState)

  if (artistAlbumLoadable.state === 'loading') {
    return (
      <div className="min-h-[650px] flex justify-center items-center">
        <LoadingIcon className="text-4xl text-indigo-600" />
      </div>
    )
  }

  if (artistAlbumLoadable.state === 'hasValue') {
    const { list, total } = artistAlbumLoadable.contents
    return (
      <div>
        <div className="card-grid">
          {list.map((a) => (
            <AlbumCard key={a.albumid} album={a} />
          ))}
        </div>
        <Pagination
          current={page}
          total={total}
          size={20}
          onChange={setPage}
          hideOnSinglePage
        />
      </div>
    )
  }

  return null
}

export default memo(ArtistAlbum)
