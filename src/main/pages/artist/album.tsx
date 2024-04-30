import React, { useCallback, useEffect, useState } from 'react'
import { useLoaderData, type LoaderFunction, Link } from 'react-router-dom'
import { fetchArtistSong } from '../../api/migu'
import { AlbumItem, PageData } from '../../types/migu'
import LoadMore from '../../components/LoadMore'
import { Card } from '@/components/ui/card'
import LazyLoadImage from '@/main/components/LazyLoadImage'
import Pagination from '@/main/components/Pagination'

const PAGE_SIZE = 30
const SAM = '010'

export const artistAlbumLoader: LoaderFunction = ({ params }) => {
  const { id } = params
  if (id) {
    return fetchArtistSong(id, 1, SAM, PAGE_SIZE).then((data) => {
      return {
        data: data.album,
        id,
        end: data.album.items.length < PAGE_SIZE,
      }
    })
  }
  throw new Response('数据不存在', { status: 404 }) // 404
}

const ArtistAlbum: React.FC = () => {
  const { data, id, end } = useLoaderData() as {
    data: PageData<AlbumItem>
    end: boolean
    id: string
  }

  const [list, setList] = useState(data.items)
  const [finished, setFinished] = useState(end)
  const [pageNum, setPageNum] = useState(1)

  const loadMore = useCallback(() => {
    if (!finished) {
      setPageNum((p) => p + 1)
    }
  }, [finished])

  useEffect(() => {
    if (pageNum > 1) {
      fetchArtistSong(id, pageNum, SAM, PAGE_SIZE).then((data) => {
        setFinished(data.album.items.length < PAGE_SIZE)
        setList((l) => l.concat(data.album.items))
      })
    }
  }, [id, pageNum])

  return (
    <div>
      <div className="grid gap-1 grid-cols-6">
        {list.map((item) => (
          <Album album={item} key={item.id} />
        ))}
      </div>
      <Pagination total={100} />
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
