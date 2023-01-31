import React, { memo, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchSearchData } from '../../api/top'
import type { SongListItem } from '../../types'
import SongList from '../../components/SongList/SongList'

const Search: React.FC = () => {
  const [searchParams] = useSearchParams()

  const [songList, setSongList] = useState<SongListItem[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const keyword = searchParams.get('q')
    if (keyword) {
      fetchSearchData(keyword, page).then((data) => {
        setSongList(data.list)
        setTotal(data.total)
      })
    }
  }, [page, searchParams])

  return (
    <SongList
      dataSource={songList}
      total={total}
      onPageChange={setPage}
      y="calc(100vh - 258px)"
    />
  )
}

export default memo(Search)
