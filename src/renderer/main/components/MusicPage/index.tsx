import React, { memo } from 'react'
import Pagination from '../Pagination'
import type { Music } from '../../types'
import MusicList from './MusicList'

interface Props {
  list: Music[]
  total: number
  current?: number
  onPageChange: (page: number) => void
}

const MusicPage: React.FC<Props> = ({ list, current, total, onPageChange }) => {
  return (
    <>
      <MusicList list={list} />
      <Pagination
        current={current}
        total={total}
        size={20}
        hideOnSinglePage
        onChange={onPageChange}
      />
    </>
  )
}

export default memo(MusicPage)
