import React, { memo, useMemo } from 'react'
import { useRecoilValueLoadable, useRecoilValue, useRecoilState } from 'recoil'
import RankingMenu from './RankingMenu'
import { currentRankingState, pageState, rankingListState } from './store'
import { FluentAdd, LoadingIcon, Play } from '../../components/icons'
import { usePlaylist } from '../../store/hooks'
import MusicPage from '../../components/MusicPage'

const RankingList: React.FC = () => {
  const rankingListLoadable = useRecoilValueLoadable(rankingListState)
  const currentRanking = useRecoilValue(currentRankingState)
  const [page, setPage] = useRecoilState(pageState)
  const { addPlaylist } = usePlaylist()

  const rankingList = useMemo(() => {
    switch (rankingListLoadable.state) {
      case 'hasValue':
        const { musicList, num, pub } = rankingListLoadable.contents
        return (
          <div className="flex-1 overflow-hidden px-2">
            <div className="flex gap-4 py-1 flex-wrap">
              <h2 className="text-2xl font-semibold">
                {currentRanking?.name.replace('酷我', '')}
              </h2>
              <div className="leading-10">
                <span className="label">更新时间</span>
                <span>{pub}</span>
              </div>
            </div>
            <div className="flex gap-4 my-4">
              <button
                className="primary-btn"
                onClick={() => addPlaylist(musicList, { reset: true })}
              >
                <Play />
                <span>播放全部</span>
              </button>
              <button
                className="default-btn"
                onClick={() => addPlaylist(musicList)}
              >
                <FluentAdd />
                <span>添加</span>
              </button>
            </div>
            <MusicPage
              list={musicList}
              current={page}
              total={Number(num)}
              onPageChange={setPage}
            />
          </div>
        )
      case 'loading':
        return (
          <div className="flex-1 h-screen flex justify-center items-center">
            <LoadingIcon className="text-4xl text-indigo-600" />
          </div>
        )
      case 'hasError':
        return null
    }
  }, [
    addPlaylist,
    currentRanking?.name,
    page,
    rankingListLoadable.contents,
    rankingListLoadable.state,
    setPage,
  ])

  return (
    <div className="flex flex-wrap gap-2">
      <RankingMenu />
      {rankingList}
    </div>
  )
}

export default memo(RankingList)
