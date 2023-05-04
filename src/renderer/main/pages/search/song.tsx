import React, { memo } from 'react'
import { useRecoilValueLoadable, useRecoilState } from 'recoil'
import MusicPage from '../../components/MusicPage'
import { searchSongPageState, searchSongQuery } from './store'
import { LoadingIcon } from '../../components/icons'

const Song: React.FC = () => {
  const [page, setPage] = useRecoilState(searchSongPageState)
  const searchSongLoadable = useRecoilValueLoadable(searchSongQuery)

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
      <MusicPage
        current={page}
        list={list}
        total={total}
        onPageChange={setPage}
      />
    )
  }

  return null
}

export default memo(Song)
