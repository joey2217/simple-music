import React from 'react'
import {
  LoaderFunction,
  NavLink,
  Outlet,
  useLoaderData,
} from 'react-router-dom'
import { fetchPlaylistTags } from '../../api/migu'
import { PlayListTag } from '../../types/migu'

export const playlistIndexLoader: LoaderFunction = () => {
  return fetchPlaylistTags()
}

const PlayListIndex: React.FC = () => {
  const data = useLoaderData() as PlayListTag[]
  return (
    <div>
      <nav>
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
          {data.map((t) => (
            <li>
              <NavLink to={t.tagId}>{t.tagName}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default PlayListIndex
