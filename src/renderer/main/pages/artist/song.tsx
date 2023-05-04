import React, { memo } from 'react'
import { useRecoilValueLoadable, useRecoilState } from 'recoil'
import MusicPage from '../../components/MusicPage'
import { artistPageState, artistSongListState } from './store'
import { LoadingIcon } from '../../components/icons'

const Song: React.FC = () => {
  const [page, setPage] = useRecoilState(artistPageState)
  const artistSongListLoadable = useRecoilValueLoadable(artistSongListState)

  if (artistSongListLoadable.state === 'loading') {
    return (
      <div className="min-h-[650px] flex justify-center items-center">
        <LoadingIcon className="text-4xl text-indigo-600" />
      </div>
    )
  }

  if (artistSongListLoadable.state === 'hasValue') {
    const { list, total } = artistSongListLoadable.contents
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
