import * as React from 'react'
import { NavLink } from 'react-router-dom'

const Sider: React.FC = () => {
  return (
    <nav
      id="menu"
      className="flex flex-col py-4 px-3 flex-shrink-0 border-r w-44"
    >
      <NavLink to="/" className="link">
        精选
      </NavLink>
      <NavLink to="/top" className="link">
        排行榜
      </NavLink>
      <NavLink to="/artists" className="link">
        歌手
      </NavLink>
      <NavLink to="/playlists" className="link">
        歌单
      </NavLink>
      <NavLink to="/download" className="link">
        下载
      </NavLink>
      <NavLink to="/settings" className="link">
        设置
      </NavLink>
    </nav>
  )
}

export default Sider
