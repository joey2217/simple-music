import React, { memo } from 'react'
import ThemeButton from './ThemeButton'
import Logo from './Logo'
import { NavLink, useLocation } from 'react-router-dom'
import SearchInput from '../components/SearchInput'

const Header: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <header
      id="titleBarContainer"
      className="w-full border-b border-slate-900/20 dark:border-slate-50/20"
    >
      <div id="titleBar" className="px-4">
        <div className="w-full flex items-center h-10 gap-4">
          <Logo />
          <nav className="flex gap-2">
            <NavLink className="link" to="/ranking">
              排行榜
            </NavLink>
            <NavLink className="link" to="/artists">
              歌手
            </NavLink>
            <NavLink className="link" to="/song-list">
              歌单
            </NavLink>
            <NavLink className="link" to="/mv">
              MV
            </NavLink>
            <NavLink className="link" to="/search">
              搜索
            </NavLink>
            <NavLink className="link" to="/like">
              喜欢
            </NavLink>
          </nav>
          <div className="flex-1 h-full draggable"></div>
          <SearchInput
            className={`${
              pathname === '/search' ? 'hidden' : 'block'
            } w-40 md:w-60`}
            inputStyle={{ paddingTop: 4, paddingBottom: 4 }}
            top={28}
          />
          <ThemeButton />
          {import.meta.env.DEV && (
            <button
              className="text-btn"
              onClick={() => window.devAPI.toggleDevtools()}
            >
              devtools
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
