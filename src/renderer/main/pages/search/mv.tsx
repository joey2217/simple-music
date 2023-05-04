import React, { memo } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { searchMVPageState, searchMVQuery } from './store'
import MvPage from '../../components/MvPage'
import { LoadingIcon } from '../../components/icons'

const MusicVideo: React.FC = () => {
  const [page, setPage] = useRecoilState(searchMVPageState)
  const searchMVLoadable = useRecoilValueLoadable(searchMVQuery)

  if (searchMVLoadable.state === 'loading') {
    return (
      <div className="min-h-[650px] flex justify-center items-center">
        <LoadingIcon className="text-4xl text-indigo-600" />
      </div>
    )
  }

  if (searchMVLoadable.state === 'hasValue') {
    const { list, total } = searchMVLoadable.contents
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
