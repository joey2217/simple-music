import { Col, Pagination, Row, Skeleton } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import { fetchSingerList } from '../../api/singer'
import SingerCard from '../../components/SingerCard'
import Tags from '../../components/Tags'
import type { Singer } from '../../types'

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
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState<string | number>(0)
  const [prefix, setPrefix] = useState<string | number>('')
  const [singerList, setSingerList] = useState<Singer[]>([])

  useEffect(() => {
    fetchSingerList(category, prefix, page).then(({ total, list }) => {
      setSingerList(list)
      setTotal(total)
    })
  }, [category, page, prefix])

  if (singerList.length === 0) {
    return <Skeleton active />
  }

  return (
    <div className="p-2">
      <Tags options={LETTER_TAGS} onChange={setPrefix} />
      <Tags options={KIND_TAGS} onChange={setCategory} />
      <Row gutter={[10, 10]}>
        {singerList.map((s, index) => (
          <Col key={s.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <SingerCard singer={s} />
          </Col>
        ))}
      </Row>
      <div className="p-2 text-center">
        <Pagination
          current={page}
          defaultPageSize={60}
          onChange={setPage}
          showSizeChanger={false}
          total={total}
        />
      </div>
    </div>
  )
}

export default memo(Singers)
