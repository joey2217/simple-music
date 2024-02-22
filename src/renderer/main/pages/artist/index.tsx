import React from 'react'
import {
  useLoaderData,
  type LoaderFunction,
  Outlet,
  NavLink,
} from 'react-router-dom'
import { fetchArtistDetail } from '../../api/migu'
import type { ArtistInfo } from '../../types/migu'

export const artistLoader: LoaderFunction = async ({ params }) => {
  if (params.id) {
    return fetchArtistDetail(params.id)
  }
  throw new Response('歌手不存在', { status: 404 }) // 404
}

const Artist: React.FC = () => {
  const info = useLoaderData() as ArtistInfo
  return (
    <div className="page flex">
      <div className="w-60 flex-shrink-0">
        <img
          src={info.smallPic}
          alt={info.name}
          className="w-40 h-40 rounded-full mx-auto"
        />
        <h2 className="font-semibold text-lg">{info.name}</h2>
        <p
          id="artist-info"
          className="whitespace-break-spaces"
          dangerouslySetInnerHTML={{ __html: info.intro }}
        ></p>
      </div>
      <div className="grow">
        <ul className="menu menu-horizontal bg-base-200 rounded-box">
          <li>
            <NavLink to="" end>
              单曲
            </NavLink>
          </li>
          <li>
            <NavLink to="album">专辑</NavLink>
          </li>
        </ul>
        <section id="artist-content">
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default Artist
