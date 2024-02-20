import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const menus = [
  { id: '27553319', name: '新歌榜' },
  { id: '27186466', name: '热歌榜' },
  { id: '27553408', name: '原创榜' },
  { id: '23189800', name: '港台榜' },
  { id: '19190036', name: '欧美榜' },
  { id: '23189813', name: '日韩榜' },
  { id: '15140045', name: 'KTV榜' },
  { id: '15140034', name: '网络榜' },
]

const TopPage: React.FC = () => {
  return (
    <div className="flex">
      <ul
        className="menu bg-base-200 w-56 flex-shrink-0 rounded-box"
        style={{
          height: 'calc(100vh - 140px)',
        }}
      >
        {menus.map((m) => (
          <li key={m.id}>
            <NavLink to={`/top/${m.id}`}>{m.name}</NavLink>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  )
}

export default TopPage
