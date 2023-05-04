import React, { memo } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const LikePage: React.FC = () => {
  return (
    <div>
      <nav className="flex justify-center gap-4 my-2">
        <NavLink className="link" to="" end>
          单曲
        </NavLink>
        <NavLink className="link" to="artist">
          歌手
        </NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default memo(LikePage)
