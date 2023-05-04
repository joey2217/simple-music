import React, { memo, useCallback, useMemo, useState } from 'react'
import { useRecoilValueLoadable, useRecoilState } from 'recoil'
import {
  songListState,
  songListPageState,
  songListTagsState,
  currentTagState,
  HOT_TAGS,
  TagParam,
} from './store'
import { ChevronDown, LoadingIcon } from '../../components/icons'
import SongListItemCard from '../../components/SongListItemCard'
import Pagination from '../../components/Pagination'

const SongListPage: React.FC = () => {
  const [show, setShow] = useState(false)

  const [page, setPage] = useRecoilState(songListPageState)
  const [currentTag, setCurrentTag] = useRecoilState(currentTagState)
  const songListLoadable = useRecoilValueLoadable(songListState)
  const songListTagsLoadable = useRecoilValueLoadable(songListTagsState)

  const onTagChange = useCallback(
    (t: TagParam) => {
      setCurrentTag(t)
      setPage(1)
    },
    [setCurrentTag, setPage]
  )

  const songListTags = useMemo(() => {
    if (songListTagsLoadable.state === 'hasValue') {
      return songListTagsLoadable.contents
        .filter((tag) => tag.data.length > 0)
        .map((tag) => (
          <div key={tag.id} className="flex items-center flex-wrap gap-2 py-1">
            <div className="text-lg text-indigo-600">{tag.name}</div>
            {tag.data.map((t) => (
              <div
                key={t.id}
                onClick={() => onTagChange({ type: 'id', id: t.id })}
                className={`px-3 py-0.5 text-center cursor-pointer rounded-full ${
                  currentTag.id === t.id
                    ? 'bg-indigo-600 hover:bg-indigo-600/80'
                    : 'hover:bg-gray-500/50'
                }`}
              >
                {t.name}
              </div>
            ))}
          </div>
        ))
    }
    return null
  }, [
    currentTag.id,
    onTagChange,
    songListTagsLoadable.contents,
    songListTagsLoadable.state,
  ])

  const songList = useMemo(() => {
    switch (songListLoadable.state) {
      case 'hasValue':
        const { list, total } = songListLoadable.contents
        return (
          <>
            <div className="my-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {list.map((item) => (
                <SongListItemCard key={item.id} item={item} />
              ))}
            </div>
            <Pagination
              total={total}
              size={20}
              current={page}
              onChange={setPage}
            />
          </>
        )

      case 'loading':
        return (
          <div className="min-h-[650px] flex justify-center items-center">
            <LoadingIcon className="text-4xl text-indigo-600" />
          </div>
        )
      case 'hasError':
        return null
    }
  }, [page, setPage, songListLoadable.contents, songListLoadable.state])

  return (
    <div>
      <div className="flex items-center flex-wrap gap-2 py-1">
        <div className="text-lg text-indigo-600">精选</div>
        {HOT_TAGS.map((t) => (
          <div
            key={t.value}
            onClick={() => onTagChange({ type: 'order', id: t.value })}
            className={`px-3 py-0.5 text-center cursor-pointer rounded-full ${
              currentTag.id === t.value
                ? 'bg-indigo-600 hover:bg-indigo-600/80'
                : 'hover:bg-gray-500/50'
            }`}
          >
            {t.label}
          </div>
        ))}
        <button className="text-btn" onClick={() => setShow((s) => !s)}>
          <span>更多</span>
          <ChevronDown className={`${show ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div className={`${show ? 'block' : 'hidden'}`}>{songListTags}</div>
      {songList}
    </div>
  )
}

export default memo(SongListPage)
