import React, { useCallback, useEffect, useState } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import { fetchPlaylist } from '../../api/migu'
import type { PageData, PlayListItem } from '../../types/migu'
import PlayListCard from '../../components/PlayListCard'
import LoadMore from '@/main/components/LoadMore'

const PAGE_SIZE = 30

export const playlistLoader: LoaderFunction = async ({ params }) => {
  return fetchPlaylist(params.tagId).then((data) => ({
    data,
    tagId: params.tagId,
    end: data.total <= data.items.length || data.items.length < PAGE_SIZE,
  }))
}

const Playlist: React.FC = () => {
  const data = useLoaderData() as {
    data: PageData<PlayListItem>
    tagId: string
    end: boolean
  }

  const [items, setItems] = useState<PlayListItem[]>([])

  const [finished, setFinished] = useState(data.end)
  const [pageNum, setPageNum] = useState(1)

  const loadMore = useCallback(() => {
    if (!finished) {
      setPageNum((p) => p + 1)
    }
  }, [finished])

  useEffect(() => {
    if (pageNum > 1) {
      fetchPlaylist(data.tagId, pageNum, PAGE_SIZE).then((data) => {
        setFinished(
          data.total <= data.items.length || data.items.length < PAGE_SIZE
        )
        setItems((l) => l.concat(data.items))
      })
    }
  }, [data.tagId, pageNum])

  return (
    <div className="grid grid-cols-6 gap-1">
      {data.data.items.map((item) => (
        <PlayListCard item={item} />
      ))}
      {items.map((item) => (
        <PlayListCard item={item} />
      ))}
      <LoadMore loadMore={loadMore} finished={finished} />
    </div>
  )
}

export default Playlist
