import React from 'react'
import {
  type LoaderFunction,
  NavLink,
  Outlet,
  redirect,
} from 'react-router-dom'

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

export const topLoader: LoaderFunction = ({ params }) => {
  if (params.id === undefined) {
    return redirect('/top/27553319')
  }
  return null
}

const TopPage: React.FC = () => {
  return (
    <div
      className="flex page overflow-hidden"
      style={{
        height: 'calc(100vh - 140px)',
      }}
    >
      <ul className="w-32 flex-shrink-0 h-full overflow-y-auto scrollbar">
        {menus.map((m) => (
          <li key={m.id}>
            <NavLink className="nav-link block w-full" to={`/top/${m.id}`}>
              {m.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="grow">
        {/* {navigation.state === 'loading' ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-7 rounded-xl" />
            <div className="flex gap-1">
              <Skeleton className="h-8 w-28 rounded-xl" />
              <Skeleton className="h-8 w-28 rounded-xl" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 10 }).map((_item, index) => (
                <Skeleton className="h-16" key={index} />
              ))}
            </div>
          </div>
        ) : (
          <Outlet />
        )} */}
        <Outlet />
      </div>
    </div>
  )
}

export default TopPage
