import React from 'react'
import { LoaderFunction } from 'react-router-dom'

export const playlistLoader: LoaderFunction = async ({ request, params }) => {
    return null
  }
  
const Playlist: React.FC = () => {
  return <div>Playlist</div>
}

export default Playlist
