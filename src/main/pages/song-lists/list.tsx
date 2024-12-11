import React from 'react'
import { LoaderFunction, useLoaderData } from 'react-router'
import { fetchPlaylist } from '../../api/migu'
import type { PlayListItem } from '../../types/migu'
import PlayListCard from '../../components/PlayListCard'
import Pagination from '@/main/components/Pagination'

const PAGE_SIZE = 30

export const SongListsLoader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url)
  const pageStr = url.searchParams.get('page')
  const page = Number(pageStr) || 1
  return fetchPlaylist(params.tagId, page, PAGE_SIZE).then((data) => ({
    tagId: params.tagId || '',
    page,
    total: data.total,
    items: data.items,
  }))
}

const SongLists: React.FC = () => {
  const { items, tagId, total, page } = useLoaderData() as {
    items: PlayListItem[]
    tagId: string
    total: number
    page: number
  }

  return (
    <>
      <div className="grid grid-cols-6 gap-1">
        {items.map((item) => (
          <PlayListCard item={item} />
        ))}
      </div>
      <Pagination
        total={total}
        current={page}
        size={PAGE_SIZE}
        urlFormat={(p) => `/song-lists/${tagId}?page=${p}`}
      />
    </>
  )
}

export default SongLists
