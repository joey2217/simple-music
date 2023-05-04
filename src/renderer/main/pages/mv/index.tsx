import React, { memo, useCallback, useMemo } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { MV_TAGS, mvListState, mvPageState, mvTagIdState } from './store'
import { LoadingIcon } from '../../components/icons'
import MvPage from '../../components/MvPage'

const MvPages: React.FC = () => {
  const mvListLoadable = useRecoilValueLoadable(mvListState)
  const [tagId, setTagId] = useRecoilState(mvTagIdState)
  const [page, setPage] = useRecoilState(mvPageState)

  const onTagChange = useCallback(
    (tagId: number) => {
      setTagId(tagId)
      setPage(1)
    },
    [setPage, setTagId]
  )

  const mvPage = useMemo(() => {
    switch (mvListLoadable.state) {
      case 'hasValue':
        const { list, total } = mvListLoadable.contents
        return (
          <MvPage
            list={list}
            total={total}
            current={page}
            onPageChange={setPage}
          />
        )
      case 'loading':
        return (
          <div className="col-span-5 min-h-[650px] flex justify-center items-center">
            <LoadingIcon className="text-4xl text-indigo-600" />
          </div>
        )
      case 'hasError':
        return null
    }
  }, [mvListLoadable.contents, mvListLoadable.state, page, setPage])
  return (
    <div>
      <div className="flex items-center flex-wrap gap-2 py-1">
        {MV_TAGS.map((t) => (
          <div
            key={t.id}
            onClick={() => onTagChange(t.id)}
            className={`px-3 py-0.5 text-center cursor-pointer rounded-full ${
              tagId === t.id
                ? 'bg-indigo-600 hover:bg-indigo-600/80'
                : 'hover:bg-gray-500/50'
            }`}
          >
            {t.name}
          </div>
        ))}
      </div>
      <div>{mvPage}</div>
    </div>
  )
}

export default memo(MvPages)
