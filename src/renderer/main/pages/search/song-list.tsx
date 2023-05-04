import React, { memo } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { searchSongListPageState, searchSongListQuery } from './store'
import { LoadingIcon } from '../../components/icons'
import SongListItemCard from '../../components/SongListItemCard'
import Pagination from '../../components/Pagination'

const SongList: React.FC = () => {
  const [page, setPage] = useRecoilState(searchSongListPageState)
  const searchSongLoadable = useRecoilValueLoadable(searchSongListQuery)

  if (searchSongLoadable.state === 'loading') {
    return (
      <div className="min-h-[650px] flex justify-center items-center">
        <LoadingIcon className="text-4xl text-indigo-600" />
      </div>
    )
  }
  if (searchSongLoadable.state === 'hasValue') {
    const { list, total } = searchSongLoadable.contents
    return (
      <div>
        <div className="my-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {list.map((item) => (
            <SongListItemCard key={item.id} item={item} />
          ))}
        </div>
        <Pagination total={total} size={20} current={page} onChange={setPage} />
      </div>
    )
  }

  return null
}

export default memo(SongList)
