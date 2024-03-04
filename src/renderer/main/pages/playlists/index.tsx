import React from 'react'
import {
  LoaderFunction,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
} from 'react-router-dom'
import { fetchPlaylistTags } from '../../api/migu'
import { PlayListTag } from '../../types/migu'

export const playlistIndexLoader: LoaderFunction = ({ params }) => {
  return fetchPlaylistTags().then((data) => {
    // if (params.tagId === undefined) {
    //   return redirect(`/playlist/${data[0].tagId}`)
    // }
    return data
  })
}

const PlayListIndex: React.FC = () => {
  const data = useLoaderData() as PlayListTag[]
  return (
    <div>
      <nav>
        {data.map((t) => (
          <NavLink className='link' key={t.tagId} to={t.tagId}>
            {t.tagName}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  )
}

export default PlayListIndex
