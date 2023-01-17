import { Button, Space, Tag } from 'antd'
import React, { memo } from 'react'
import { Typography } from 'antd'

const { Title, Text } = Typography

interface Props {
  name: string
  coverImgUrl: string
  description: string
}

const SongListIntro: React.FC<Props> = ({ name, coverImgUrl, description }) => {
  return (
    <div className="flex p-4">
      <img className="w-40 rounded mr-4" src={coverImgUrl} alt="歌单封面" />
      <div>
        <div className="flex items-center mb-2">
          <Tag color="red">歌单</Tag>
          <Title level={4} style={{ marginBottom: 0 }}>
            {name}
          </Title>
        </div>
        <div className="mb-2">
          <Text type="secondary">{description}</Text>
        </div>
        <div>
          <Space>
            <Button type='primary' shape="round">播放</Button>
            <Button shape="round">播放</Button>
            <Button shape="round">播放</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default memo(SongListIntro)
