import React from 'react'
import {
  useLoaderData,
  type LoaderFunction,
  Outlet,
  NavLink,
} from 'react-router-dom'
import { fetchArtistDetail } from '../../api/migu'
import type { ArtistInfo } from '../../types/migu'
import Image from '@/main/components/Image'

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
        <Image
          src={info.smallPic}
          alt={info.name}
          className="w-40 h-40 rounded-full mx-auto"
        />
        <h2 className="font-semibold text-lg">{info.name}</h2>
        <div id="artist-info" className='scrollbar'>
          <p
            className="whitespace-break-spaces pr-1 text-sm"
            dangerouslySetInnerHTML={{ __html: info.intro }}
          ></p>
        </div>
      </div>
      <div className="grow">
        <nav className="py-4">
          <NavLink to="" end className="nav-link">
            单曲
          </NavLink>
          <NavLink to="album" className="nav-link">
            专辑
          </NavLink>
        </nav>
        <div id="artist-content" className='scrollbar'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Artist
