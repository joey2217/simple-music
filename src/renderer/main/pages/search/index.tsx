import React, { memo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { fetchSearchData } from '../../api/top'
import SongList from '../../components/SongList/SongList'
import { searchSongListState, pageState, totalState } from './store'

const Search: React.FC = () => {
  const [searchParams] = useSearchParams()

  const [songList, setSongList] = useRecoilState(searchSongListState)
  const [page, setPage] = useRecoilState(pageState)
  const [total, setTotal] = useRecoilState(totalState)

  useEffect(() => {
    const keyword = searchParams.get('q')
    if (keyword) {
      fetchSearchData(keyword, page).then((data) => {
        setSongList(data.list)
        setTotal(data.total)
      })
    } else {
      setSongList([])
      setTotal(0)
      setPage(1)
    }
  }, [page, searchParams, setPage, setSongList, setTotal])

  return (
    <SongList
      dataSource={songList}
      total={total}
      onPageChange={setPage}
      y="calc(100vh - 298px)"
    />
  )
}

export default memo(Search)
