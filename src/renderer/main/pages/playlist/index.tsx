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
        {data.map((t) => (
          <NavLink key={t.tagId} to={t.tagId}>
            {t.tagName}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  )
}

export default PlayListIndex
