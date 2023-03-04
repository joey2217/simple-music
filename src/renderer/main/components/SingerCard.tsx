import React, { memo } from 'react'
import { Avatar, Card, theme } from 'antd'
import type { Singer } from '../types'
import { Link } from 'react-router-dom'

const { Meta } = Card

interface Props {
  singer: Singer
}

const SingerCard: React.FC<Props> = ({ singer }) => {
  const {
    token: { colorText },
  } = theme.useToken()
  return (
    <Link
      to={'/singer/' + singer.id}
      className="text-center"
      style={{ color: colorText }}
    >
      <Card cover={<img alt={singer.name} src={singer.pic} />}>
        <Meta title={singer.name} description={singer.musicNum + '首歌曲'} />
      </Card>
    </Link>
  )
}

export default memo(SingerCard)
