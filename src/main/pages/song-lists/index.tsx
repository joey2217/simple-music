import React from 'react'
import {
  LoaderFunction,
  NavLink,
  Outlet,
  useLoaderData,
} from 'react-router'
import { fetchPlaylistTags } from '../../api/migu'
import { PlayListTag } from '../../types/migu'

export const songListIndexLoader: LoaderFunction = () => {
  return fetchPlaylistTags().then((data) => {
    // if (params.tagId === undefined) {
    //   return redirect(`/playlist/${data[0].tagId}`)
    // }
    return data
  })
}

const SongListIndex: React.FC = () => {
  const data = useLoaderData() as PlayListTag[]
  return (
    <div className="page">
      <nav className="mb-2">
        <NavLink className="nav-link" end to="">
          最热
        </NavLink>
        {data.map((t) => (
          <NavLink className="nav-link" key={t.tagId} to={t.tagId}>
            {t.tagName}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  )
}

export default SongListIndex
