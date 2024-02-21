import React from 'react'
import { useLoaderData, type LoaderFunction, Outlet } from 'react-router-dom'
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
    <div className="page">
      <div className="flex gap-4">
        <img
          src={info.smallPic}
          alt={info.name}
          className="w-40 h-40 rounded-lg"
        />
        <h2 className="font-semibold text-lg">{info.name}</h2>
      </div>
      {/* <p
        className="whitespace-break-spaces"
        dangerouslySetInnerHTML={{ __html: info.intro }}
      ></p> */}
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Artist
