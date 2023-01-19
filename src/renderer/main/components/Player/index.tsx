import React, { memo } from 'react'
import MusicInfo from './MusicInfo'
import Control from './Control'
import PlayList from './PlayList'
import { Col, Row } from 'antd'

const Player: React.FC = () => {
  return (
    <Row align="middle" className="h-20 px-4 shadow-md shadow-white">
      <Col span={6}>
        <MusicInfo />
      </Col>
      <Col span={12} className="h-full pt-1">
        <Control />
      </Col>
      <Col span={6}>
        <PlayList />
      </Col>
    </Row>
  )
}

export default memo(Player)
