import React, { memo } from 'react'
import { Typography } from 'antd'
import { usePlayList } from '../../store/hooks'

const { Title } = Typography

const MusicInfo: React.FC = () => {
  const { currentPlay } = usePlayList()

  if (currentPlay) {
    const { pic120, name, artist, album } = currentPlay
    return (
      <div className="flex">
        <img className="w-16 h-16 mr-2" src={pic120} alt={name} />
        <div className='py-1'>
          <Title level={5}>{name}</Title>
          <div>{artist}</div>
        </div>
      </div>
    )
  }
  return null
}

export default memo(MusicInfo)
