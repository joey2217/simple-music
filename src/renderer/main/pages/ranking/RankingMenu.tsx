import React, { memo, useEffect, useMemo } from 'react'
import {
  useSetRecoilState,
  useRecoilValueLoadable,
  useRecoilState,
} from 'recoil'
import { currentRankingState, pageState, rankingMenuState } from './store'
import { LoadingIcon } from '../../components/icons'
import type { RankingMenu as RankingMenuType } from '../../types/ranking'

const RankingMenu: React.FC = () => {
  const setCurrentRanking = useSetRecoilState(currentRankingState)
  const rankingMenuLoadable = useRecoilValueLoadable(rankingMenuState)

  const rankingMenu = useMemo(() => {
    switch (rankingMenuLoadable.state) {
      case 'hasValue':
        return rankingMenuLoadable.contents.map((m) => (
          <RankingMenuItem key={m.name} item={m} />
        ))
      case 'loading':
        return (
          <div className="min-h-screen flex justify-center items-center">
            <LoadingIcon className="text-4xl text-indigo-600" />
          </div>
        )
      case 'hasError':
        return null
    }
  }, [rankingMenuLoadable.contents, rankingMenuLoadable.state])

  useEffect(() => {
    if (rankingMenuLoadable.state === 'hasValue') {
      setCurrentRanking((c) =>
        c ? c : rankingMenuLoadable.contents[0]?.list[0]
      )
    }
  }, [
    rankingMenuLoadable.contents,
    rankingMenuLoadable.state,
    setCurrentRanking,
  ])

  return (
    <div className="w-full mx-4 md:mx-0 md:w-fit  p-4 rounded border border-slate-900/20 dark:border-slate-50/20">
      {rankingMenu}
    </div>
  )
}

interface Props {
  item: RankingMenuType
}

const RankingMenuItem: React.FC<Props> = ({ item }) => {
  const [currentRanking, setCurrentRanking] =
    useRecoilState(currentRankingState)
  const setPage = useSetRecoilState(pageState)

  return (
    <div className="mb-1">
      <div className="pb-1 text-lg border-b border-slate-900/20 dark:border-slate-50/20">
        {item.name}
      </div>
      <div className="py-1">
        {item.list.map((m) => (
          <div
            key={m.id}
            className={`py-0.5 cursor-pointer hover:text-indigo-600/90 ${
              currentRanking?.sourceid === m.sourceid ? 'text-indigo-600' : ' '
            }`}
            onClick={() => {
              setCurrentRanking(m)
              setPage(1)
            }}
          >
            {m.name.replace('酷我', '')}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(RankingMenu)
