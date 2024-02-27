import React from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import { fetchPlaylist } from '../../api/migu'
import type { PageData, PlayListItem } from '../../types/migu'
import PlayListCard from '../../components/PlayListCard'

export const playlistLoader: LoaderFunction = async ({ params }) => {
  return fetchPlaylist(params.tagId)
}

const Playlist: React.FC = () => {
  const { items } = useLoaderData() as PageData<PlayListItem>

  return (
    <div className="grid grid-cols-6 gap-1">
      {items.map((item) => (
        <PlayListCard item={item} />
      ))}
    </div>
  )
}

export default Playlist