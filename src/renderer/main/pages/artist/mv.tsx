import React from 'react'
import { type LoaderFunction } from 'react-router-dom'
import { fetchArtistSong } from '../../api/migu'

const PAGE_SIZE = 30
const SAM = '001'

export const artistMvLoader: LoaderFunction = ({ params }) => {
  const { id } = params
  if (id) {
    return fetchArtistSong(id, 1, SAM, PAGE_SIZE).then((data) => {
      console.log(data.mv)
      return {
        data: data.mv,
        id,
        end: data.mv.items.length < PAGE_SIZE,
      }
    })
  }
  throw new Response('数据不存在', { status: 404 }) // 404
}

const ArtistMv: React.FC = () => {
  return <div>ArtistMv</div>
}

export default ArtistMv
