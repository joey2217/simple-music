import React, { memo } from 'react'
import type { Mv } from '../../types'
import Pagination from '../Pagination'
import MvCard from './MvCard'

interface Props {
  list: Mv[]
  total: number
  current?: number
  onPageChange: (page: number) => void
}

const MvPage: React.FC<Props> = ({
  list,
  total,
  onPageChange,
  current = 1,
}) => {
  return (
    <>
      <div className="card-grid mb-4 mt-2">
        {list.map((m) => (
          <MvCard key={m.id} mv={m} />
        ))}
      </div>
      <Pagination
        total={total}
        size={20}
        current={current}
        hideOnSinglePage
        onChange={onPageChange}
      />
    </>
  )
}

export default memo(MvPage)
