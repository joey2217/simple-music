import React, { useCallback, useEffect, useState } from 'react'
import {
  useLoaderData,
  type LoaderFunction,
  Link,
  useNavigate,
} from 'react-router-dom'
import { fetchArtistSong } from '../../api/migu'
import { AlbumItem, PageData } from '../../types/migu'
import { Card } from '@/components/ui/card'
import LazyLoadImage from '@/main/components/LazyLoadImage'
import Pagination from '@/main/components/Pagination'

const PAGE_SIZE = 30
const SAM = '010'

export const artistAlbumLoader: LoaderFunction = ({ params, request }) => {
  const url = new URL(request.url)
  const pageStr = url.searchParams.get('page')
  const { id } = params
  if (id) {
    const page = Number(pageStr) || 1
    return fetchArtistSong(id, page, SAM, PAGE_SIZE).then((data) => {
      return {
        data: data.album,
        id,
        page,
        end: data.album.items.length < PAGE_SIZE,
        total: data.album.total,
      }
    })
  }
  throw new Response('数据不存在', { status: 404 }) // 404
}

const ArtistAlbum: React.FC = () => {
  const { data, id, total, page } = useLoaderData() as {
    data: PageData<AlbumItem>
    total: number
    page: number
    id: string
  }
  const navigate = useNavigate()

  return (
    <div>
      <Link to={`/artist/${id}/album?page=2`}>page2</Link>
      <div className="grid gap-1 grid-cols-6">
        {data.items.map((item) => (
          <Album album={item} key={item.id} />
        ))}
      </div>
      <Pagination
        total={total}
        defalutPage={page}
        size={PAGE_SIZE}
        onChange={(p) => navigate(`/artist/${id}/album?page=${p}`)}
      />
    </div>
  )
}

const Album: React.FC<{ album: AlbumItem }> = ({ album }) => {
  return (
    <Link to={`/album/${album.id}`} title={album.name}>
      <Card>
        <LazyLoadImage
          className="rounded-t-xl"
          src={album.largePic}
          alt={album.name}
        />
        <h4 className="py-2 px-1.5 truncate font-medium leading-none">
          {album.name}
        </h4>
      </Card>
    </Link>
  )
}

export default ArtistAlbum
