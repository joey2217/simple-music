import React, { memo } from 'react'
import { useRecoilValueLoadable, useRecoilState } from 'recoil'
import { searchAlbumPageState, searchAlbumQuery } from './store'
import AlbumCard from '../../components/AlbumCard'
import Pagination from '../../components/Pagination'
import { LoadingIcon } from '../../components/icons'

const SearchAlbum: React.FC = () => {
  const [page, setPage] = useRecoilState(searchAlbumPageState)
  const searchAlbumLoadable = useRecoilValueLoadable(searchAlbumQuery)

  if (searchAlbumLoadable.state === 'loading') {
    return (
      <div className="min-h-[650px] flex justify-center items-center">
        <LoadingIcon className="text-4xl text-indigo-600" />
      </div>
    )
  }

  if (searchAlbumLoadable.state === 'hasValue') {
    const { list, total } = searchAlbumLoadable.contents
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

export default memo(SearchAlbum)
