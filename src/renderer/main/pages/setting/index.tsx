import React, { memo } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Setting: React.FC = () => {
  return (
    <div>
      <nav className="flex justify-center my-4 gap-2">
        <NavLink className="link" to="" end>
          单曲
        </NavLink>

        <NavLink className="link" to="about">
          关于
        </NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default memo(Setting)
