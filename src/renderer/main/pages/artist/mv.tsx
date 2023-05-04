import React, { memo } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { artistMVPageState, artistMVState } from './store'
import MvPage from '../../components/MvPage'
import { LoadingIcon } from '../../components/icons'

const MusicVideo: React.FC = () => {
  const [page, setPage] = useRecoilState(artistMVPageState)
  const artistMVLoadable = useRecoilValueLoadable(artistMVState)

  if (artistMVLoadable.state === 'loading') {
    return (
      <div className="min-h-[650px] flex justify-center items-center">
        <LoadingIcon className="text-4xl text-indigo-600" />
      </div>
    )
  }

  if (artistMVLoadable.state === 'hasValue') {
    const { list, total } = artistMVLoadable.contents
    return (
      <div>
        <MvPage
          current={page}
          list={list}
          total={total}
          onPageChange={setPage}
        />
      </div>
    )
  }

  return null
}

export default memo(MusicVideo)
