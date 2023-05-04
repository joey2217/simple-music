import React, { memo } from 'react'
import SearchInput from '../../components/SearchInput'
import { NavLink, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { searchKeywordState } from '../../store/atom'

const Search: React.FC = () => {
  const keyword = useRecoilValue(searchKeywordState)
  return (
    <div>
      <div>
        <SearchInput />
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
