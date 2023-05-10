import React, { memo, useCallback } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import SearchInput from '../../components/SearchInput'
import { searchKeywordHistoryState, searchKeywordState } from '../../store/atom'
import { FluentDelete, RoundClose } from '../../components/icons'

const Search: React.FC = () => {
  const [keyword, setKeyword] = useRecoilState(searchKeywordState)
  const [keywordHistory, setKeywordHistory] = useRecoilState(
    searchKeywordHistoryState
  )

  const onClearHistory = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
      setKeywordHistory((list) => [
        ...list.slice(0, index),
        ...list.slice(index + 1),
      ])
    },
    [setKeywordHistory]
  )

  return (
    <div>
      <div>
        <SearchInput />
      </div>
      <div>
        <div className="px-2 py-1 flex items-center gap-4 mt-4">
          <span>最近搜索记录</span>
          <button title="清空" onClick={() => setKeywordHistory([])}>
            <FluentDelete />
          </button>
        </div>
        <ul className="flex flex-wrap gap-2">
          {keywordHistory.map((word, index) => (
            <li
              key={word}
              className="cursor-pointer py-1 px-2 hover:bg-neutral-500/50 rounded-md flex items-center gap-4"
              onClick={() => setKeyword(word)}
            >
              <div>{word}</div>
              <button
                className="flex items-center justify-center w-5 h-5 rounded-full  bg-neutral-700/50  hover:bg-neutral-700 text-white text-base"
                title="删除"
                onClick={(e) => onClearHistory(e, index)}
              >
                <RoundClose />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="my-4 flex gap-8 items-baseline">
        <div className="text-2xl font-semibold">搜索结果</div>
        {keyword ? (
          <nav className="flex my-4 gap-2">
            <NavLink className="link" to="" end>
              单曲
            </NavLink>
            <NavLink className="link" to="artist">
              歌手
            </NavLink>
            <NavLink className="artist" to="song-list">
              歌单
            </NavLink>
            <NavLink className="link" to="album">
              专辑
            </NavLink>
            <NavLink className="link" to="mv">
              MV
            </NavLink>
          </nav>
        ) : (
          <div>暂无数据</div>
        )}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default memo(Search)
