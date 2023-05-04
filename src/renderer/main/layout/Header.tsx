import React, { memo } from 'react'
import ThemeButton from './ThemeButton'
import Logo from './Logo'
import { NavLink, useLocation } from 'react-router-dom'
import SearchInput from '../components/SearchInput'

const menus = (
  <>
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
  </>
)

const Header: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <header className="border-b border-slate-900/20 dark:border-slate-50/20">
      <div className="container mx-auto flex items-center h-10 gap-4">
        <Logo />
        <nav className="hidden md:flex gap-2">{menus}</nav>
        <div className='ml-auto'></div>
        <SearchInput
          className={`${pathname === '/search' ? 'hidden' : 'block'} w-40 md:w-60`}
          inputStyle={{ paddingTop: 4, paddingBottom: 4 }}
          top={28}
        />
        <ThemeButton />
      </div>
      {
        <nav className="h-10 flex md:hidden items-center justify-around">
          {menus}
        </nav>
      }
    </header>
  )
}

export default memo(Header)
