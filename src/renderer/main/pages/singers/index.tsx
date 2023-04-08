import { Pagination, Skeleton } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import { fetchSingerList } from '../../api/singer'
import SingerCard from '../../components/SingerCard'
import Tags from '../../components/Tags'
import type { Singer } from '../../types'
import { useRecoilState } from 'recoil'
import { paramsState, useSingerList } from './store'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LETTER_TAGS = [
  {
    label: '热门',
    value: '',
  },
]
  .concat(LETTERS.split('').map((s) => ({ label: s, value: s })))
  .concat({
    label: '#',
    value: '%23',
  })

const KIND_TAGS = [
  '全部',
  '华语男',
  '华语女',
  '华语组合',
  '日韩男',
  '日韩女',
  '日韩组合',
  '欧美男',
  '欧美女',
  '欧美组合',
  '其他',
].map((s, index) => ({ label: s, value: index }))

const Singers: React.FC = () => {
  const { params, setParams, singerList, total } = useSingerList()

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ height: 'calc(100vh - 200px)' }}
    >
      <Tags
        options={LETTER_TAGS}
        onChange={(prefix) => setParams((p) => ({ ...p, prefix, page: 1 }))}
      />
      <Tags
        options={KIND_TAGS}
        onChange={(category) =>
          setParams((p) => ({ ...p, category: category as number, page: 1 }))
        }
      />
      <React.Suspense fallback={<Skeleton active />}>
        <div className="flex-1 overflow-auto grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6">
          {singerList.map((s, index) => (
            <SingerCard key={s.id} singer={s} />
          ))}
        </div>
        <div className="p-2 text-center">
          <Pagination
            current={params.page}
            defaultPageSize={60}
            onChange={(page) => setParams((p) => ({ ...p, page }))}
            showSizeChanger={false}
            total={total}
          />
        </div>
      </React.Suspense>
    </div>
  )
}

export default memo(Singers)
