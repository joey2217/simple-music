import React from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import { fetchSongDetail } from '../api/migu'
import type { SongDetail } from '../types/migu'

export const songLoader: LoaderFunction = ({ params }) => {
  if (params.copyrightId) {
    return fetchSongDetail(params.copyrightId)
  }
  throw new Response('数据不存在', { status: 404 }) // 404
}

const Song: React.FC = () => {
  const data = useLoaderData() as SongDetail // 获取数据
  return (
    <div>
      <h2>{data.musicName}</h2>
      <h3>{data.singers.map((s) => s.singerName).join('/')}</h3>
      <img src={data.picUrl} alt={data.musicName} />
    </div>
  )
}

export default Song
