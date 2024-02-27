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
      <NavLink to="/top/27553319" className="link">
        排行榜
      </NavLink>
      <NavLink to="/artists/nan/huayu" className="link">
        歌手
      </NavLink>
      <NavLink to="/about" className="link">
        关于
      </NavLink>
    </nav>
  )
}

export default Sider
