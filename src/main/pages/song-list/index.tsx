import React from 'react'
import { Outlet, useLoaderData, type LoaderFunction } from 'react-router-dom'
import { fetchPlaylistInfo } from '../../api/migu'
import type { PlaylistInfo } from '../../types/migu'
import LazyImage from '../../components/LazyLoadImage'

export const songListPageLoader: LoaderFunction = ({ params }) => {
  if (params.playlistId) {
    return fetchPlaylistInfo(params.playlistId).then((data) => ({
      data,
      playlistId: params.playlistId,
    }))
  }
  throw new Response('Not Found', { status: 404 }) // 404
}

const SongList: React.FC = () => {
  const { data } = useLoaderData() as {
    data: PlaylistInfo
    playlistId: string
  }

  return (
    <div>
      <div className="flex gap-2">
        <LazyImage
          src={data.image}
          alt={data.playListName}
          className="aspect-square h-24 rounded-md"
        />
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {data.playListName}
          </h4>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            {data.summary}
          </blockquote>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default SongList
